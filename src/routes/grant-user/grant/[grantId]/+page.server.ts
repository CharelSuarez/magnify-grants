import { db } from '$lib/server/db';
import { redirect, setFlash } from 'sveltekit-flash-message/server';
import type { Actions, PageServerLoad } from './$types';
import { fromShort } from '$lib/utils/url';
import { getBannerURL, getGrantDocumentURL, listGrantDocuments } from '$lib/utils/downloads';
import { formDocSchema } from '$lib/validation/app_schema';
import { superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { uploadRequiredDocument } from '$lib/utils/uploads';

export const load: PageServerLoad = async (event) => {
	try {
		const id = fromShort(event.params.grantId);

		const grant = await db.grant.findFirst({
			where: {
				id: id
			},
			include: {
				organization: {
					select: {
						id: true,
						name: true
					}
				},
				requiredDocuments: true
			}
		});

		if (!grant) {
			redirect(
				307,
				`/grant-user`,
				{
					richColors: true,
					type: 'error',
					message: 'Grant not found!'
				},
				event
			);
		}

		const forms = await db.formsOnGrants.findMany({
			where: {
				grantId: grant.id
			},
			select: {
				form: {
					select: {
						id: true,
						name: true,
						applications: {
							select: {
								id: true,
								updated: true,
								complete: true
							},
							where: {
								userId: event.locals.user?.id
							}
						}
					}
				}
			}
		});

		// Flatten the form and add application field for the latest one.
		const formsWithApplication: {
			name: string;
			id: string;
			applications: {
				id: string;
				complete: boolean;
				updated: Date;
			}[];
			application?: {
				id: string;
				complete: boolean;
			};
		}[] = forms.map((form) => form.form);

		formsWithApplication.forEach((form) => {
			// Find the application with the most recent date.
			form.application =
				form.applications.length == 0
					? undefined
					: form.applications.reduce((form, nextForm) => {
							return nextForm.updated > form.updated ? nextForm : form;
						}, form.applications[0]);
		});

		const supabase = event.locals.supabase;

		const { data: bannerData } = await getBannerURL(grant.id, supabase);

		const { data: documentList } = await listGrantDocuments(grant.id, supabase);

		const documents: { name: string; url: string }[] = [];

		if (documentList) {
			for (const doc of documentList) {
				const { data } = await getGrantDocumentURL(grant.id, doc.name, supabase);

				if (!data) {
					continue;
				}

				documents.push({
					name: doc.name,
					url: data.signedUrl
				});
			}
		}

		const appCount = await db.submission.count({
			where: {
				userId: event.locals.user?.id,
				grantId: grant.id
			}
		});

		return {
			submitted: appCount !== 0,
			form: await superValidate(zod(formDocSchema)),
			grant,
			forms: formsWithApplication,
			banner: bannerData ? bannerData.signedUrl : null,
			documents: documents
		};
	} catch (err) {
		console.log(err);
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
		const user = event.locals.user;

		if (!user) {
			return fail(401);
		}

		const form = await superValidate(event, zod(formDocSchema));

		if (!form.valid) {
			fail(
				400,
				withFiles({
					form
				})
			);
		}

		try {
			const data = form.data;

			const appCount = await db.submission.count({
				where: {
					userId: event.locals.user?.id,
					grantId: data.grantId
				}
			});

			if (appCount !== 0) {
				return fail(
					401,
					withFiles({
						form
					})
				);
			}

			const forms = await db.formsOnGrants.findMany({
				where: {
					grantId: data.grantId,
					form: {
						applications: {
							some: {
								userId: user.id
							}
						}
					}
				},
				select: {
					formId: true,
					form: {
						select: {
							applications: {
								select: {
									id: true,
									complete: true
								}
							}
						}
					}
				}
			});

			const applicationIds: { id: string }[] = [];

			// this works because we check for grantid and userid. technically not O(n^2) because of design
			for (const form of forms) {
				for (const app of form.form.applications) {
					if (!app.complete) {
						fail(
							500,
							withFiles({
								form
							})
						);
					}
					applicationIds.push({
						id: app.id
					});
				}
			}

			for (const doc of data.documents) {
				if (doc.file) {
					const { data, error } = await uploadRequiredDocument(
						user.id,
						doc.id,
						doc.file,
						event.locals.supabase
					);
					if (!data) {
						console.log(error);
						return fail(
							500,
							withFiles({
								form
							})
						);
					}
				}
			}

			await db.submission.create({
				data: {
					user: {
						connect: {
							id: user.id
						}
					},
					grant: {
						connect: {
							id: data.grantId
						}
					},
					applications: {
						connect: applicationIds
					}
				}
			});
		} catch (err) {
			console.log(err);
			fail(500);
		}

		redirect(
			301,
			'/grant-user/',
			{
				type: 'success',
				message: 'Successfully submitted application',
				richColors: true
			},
			event
		);
	}
};
