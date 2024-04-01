import { db } from '$lib/server/db';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { fromShort } from '$lib/utils/url';
import { FieldType, type Form } from '@prisma/client';
import { getBannerURL } from '$lib/utils/downloads';

export const load: PageServerLoad = async (event) => {
	try {
		const user = event.locals.user;

		if (!user) {
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

		const submissionId = fromShort(event.params.submissionId);
		const formId = fromShort(event.params.formId);

		const possibleApp = await db.application.findFirst({
			where: {
				submissionId,
				formId
			},
			select: {
				id: true,
				complete: true,
				grant: {
					select: {
						id: true,
						title: true,
						bannerAlt: true,
						organizationId: true
					}
				}
			},
			orderBy: {
				updated: 'desc'
			}
		});
		if (!possibleApp) {
			redirect(
				307,
				'/grant-user',
				{
					richColors: true,
					type: 'error',
					message: 'Application not found'
				},
				event
			);
		}
		const app = possibleApp;

		// Check that user is the grant's owner.
		const grant = app.grant;
		const organizationId = (await event.locals.getGrantAdmin())?.organizationId;
		if (organizationId !== grant.organizationId) {
			redirect(
				307,
				'/grant-user',
				{
					richColors: true,
					type: 'error',
					message: 'Forbidden access to application'
				},
				event
			);
		}

		const possibleForm = await db.formsOnGrants.findFirst({
			where: {
				formId,
				grantId: grant.id
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
				}
			}
		});
		if (!possibleForm) {
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
		const form = possibleForm.form;

		const fields = await db.applicationEntry.findMany({
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
		// Parse application entries into their objects.
		const formData = Object.fromEntries(
			fields.map((field) => {
				const value = JSON.parse(field.value);
				// JSON can't decode dates properly, embarassing really...
				if (field.field.type === FieldType.Date) {
					return [field.fieldId, new Date(value)];
				}
				return [field.fieldId, value];
			})
		);

		const { data: bannerData } = await getBannerURL(grant.id, event.locals.supabase);

		return {
			submissionId,
			app,
			form,
			grant,
			formData,
			banner: bannerData ? bannerData.signedUrl : null
		};
	} catch (err) {
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
