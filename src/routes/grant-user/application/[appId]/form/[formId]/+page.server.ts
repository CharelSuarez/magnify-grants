import { db } from '$lib/server/db';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { fromShort, toShort } from '$lib/utils/url';
import { FieldType, type Field, type Form } from '@prisma/client';
import { getBannerURL } from '$lib/utils/downloads';

export const load: PageServerLoad = async (event) => {
	try {
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

		const formId = fromShort(event.params.formId);
		const appId = fromShort(event.params.appId);

		const possibleApplication = (await db.application.findFirst({
			where: {
				id: appId,
			},
			select: {
				userId: true,
				grant: {
					select: {
						id: true,
						title: true,
						bannerAlt: true,
						organizationId: true
					}
				}
			}
		}));

		if (!possibleApplication) {
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

		// Check that user is the grant owner or the grant's org admin.
		const grant = possibleApplication.grant;
		const organizationId = (await event.locals.getGrantAdmin())?.organizationId;
		if (possibleApplication.userId !== event.locals.user.id && 
			organizationId !== grant.organizationId) {
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
		
		// Find latest application.
		const possibleApp = await db.application.findFirst({
			where: {
				id: appId,
			},
			orderBy: {
				updated: 'desc'
			},
			select: {
				id: true,
				submission: {
					select: {
						status: true
					}
				}
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
			submission: app.submission,
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