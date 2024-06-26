import { db } from '$lib/server/db';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { fromShort } from '$lib/utils/url';
import { FieldType, type Field, type Form } from '@prisma/client';
import { z, type ZodTypeAny } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate, type Infer } from 'sveltekit-superforms';
import { getFormDraftSchema, getFormSubmissionSchema, type FormMessage } from '$lib/validation/form_schema';
import { fail, type Actions, error } from '@sveltejs/kit';
import { getBannerURL } from '$lib/utils/downloads';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user === null) {
		redirect(
			307,
			'/grant-user',
			{
				richColors: true,
				type: 'error',
				message: 'Not authenticated to view form'
			},
			event
		);
	}

	try {
		const formId = fromShort(event.params.formId);
		const grantId = fromShort(event.params.grantId);

		const { data: bannerData } = await getBannerURL(grantId, event.locals.supabase);

		const formOnGrants = await db.formsOnGrants.findFirst({
			where: {
				formId,
				grantId
			},
			include: {
				form: {
					include: {
						fields: {
							orderBy: {
								index: 'asc' // Sort by field index.
							}
						}
					}
				},
				grant: {
					select: {
						id: true,
						title: true,
						bannerAlt: true
					}
				}
			}
		});

		const appCount = await db.submission.count({
			where: {
				userId: event.locals.user?.id,
				grantId: grantId
			}
		});

		if (!formOnGrants) {
			redirect(
				307,
				'/grant-user',
				{
					richColors: true,
					type: 'error',
					message: 'Form not found'
				},
				event
			);
		}

		// Find latest application.
		const possibleApp = await db.application.findFirst({
			where: {
				userId: event.locals.user.id,
				formId,
				grantId
			},
			orderBy: {
				updated: 'desc'
			},
			select: {
				id: true
			}
		});

		let formData = {};

		if (possibleApp) {
			const app = possibleApp;
			let fields = await db.applicationEntry.findMany({
				where: {
					appId: app.id
				},
				select: {
					fieldId: true,
					value: true,
					field: {
						select: {
							type: true
						}
					}
				}
			});

			// Remove null fields...
			fields = fields.filter((field) => field.value !== undefined && field.value !== "null" 
				&& field.value !== "");

			// Parse application entries into their objects.
			formData = Object.fromEntries(
				fields.map((field) => {
					const value = JSON.parse(field.value);
					// JSON can't decode dates properly, embarassing really...
					if (field.field.type === FieldType.Date) {
						return [field.fieldId, new Date(value)];
					}
					return [field.fieldId, value];
				})
			);
		}

		// Always use draft schema, since this could be a draft or incomplete.
		const formSchema = getFormDraftSchema(formOnGrants.form.fields);
		const superform = await superValidate(formData, zod(formSchema));

		return {
			editable: appCount === 0,
			formOnGrants,
			superform,
			banner: bannerData ? bannerData.signedUrl : null
		};
	} catch (err) {
		console.error(err);
		redirect(
			307,
			'/grant-user',
			{
				richColors: true,
				type: 'error',
				message: 'Server error occurred'
			},
			event
		);
	}
};

export const actions: Actions = {
	default: async (event) => {
		if (
			event.locals.user === null ||
			event.params.formId === undefined ||
			event.params.grantId === undefined
		) {
			return fail(400, {});
		}

		const formId = fromShort(event.params.formId);
		const grantId = fromShort(event.params.grantId);

		const appCount = await db.submission.count({
			where: {
				userId: event.locals.user?.id,
				grantId: grantId
			}
		});

		const form = await db.form.findFirst({
			where: {
				id: formId
			},
			include: {
				fields: {
					orderBy: {
						index: 'asc' // Sort by field index.
					}
				}
			}
		});

		if (!form) {
			return fail(400, {});
		}

		if (appCount !== 0) {
			return fail(500, {
				form
			});
		}

		const requestForm = await event.request.formData();

		// Check if the form matches the form's schema.
		let formSchema = getFormSubmissionSchema(form.fields);
		let superform = await superValidate<Infer<typeof formSchema>, FormMessage>(requestForm, zod(formSchema));
		let formData = superform.data;

		let complete = true;
		if (!superform.valid) {
			// If not, check if the form matches the form's draft schema.
			formSchema = getFormDraftSchema(form.fields);
			superform = await superValidate(requestForm, zod(formSchema));
			formData = superform.data;
			if (!superform.valid) {
				return fail(400, { message: 'Invalid draft', superform });
			}
			complete = false;
		}

		// Find latest application.
		let possibleApp = await db.application.findFirst({
			where: {
				userId: event.locals.user.id,
				formId,
				grantId
			},
			orderBy: {
				updated: 'desc'
			}
		});

		if (!possibleApp) {
			// If application doesn't exist, make one.
			possibleApp = await db.application.create({
				data: {
					userId: event.locals.user.id,
					formId,
					grantId,
					complete
				}
			});
		} else {
			possibleApp = await db.application.update({
				where: {
					id: possibleApp.id
				},
				data: {
					complete,
					updated: new Date()
				}
			});
		}
		if (!possibleApp) {
			return fail(400, { message: 'Internal server error', superform });
		}
		// So typescript can shut its mouth...
		const app = possibleApp;

		await db.$transaction(
			Object.keys(formData).map((fieldId) =>
				db.applicationEntry.upsert({
					where: {
						appId_fieldId: {
							appId: app.id,
							fieldId
						}
					},
					update: {
						value: JSON.stringify(formData[fieldId])
					},
					create: {
						appId: app.id,
						fieldId,
						value: JSON.stringify(formData[fieldId])
					}
				})
			)
		);

		if (complete) {
			return message(superform, {status: 'submitted', text: "Form submitted successfully!"});
		} else {
			return message(superform, {status: 'draft', text: "Draft saved successfully!"});
		}
	}
};
