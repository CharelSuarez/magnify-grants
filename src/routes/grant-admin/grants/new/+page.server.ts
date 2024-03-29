import { uploadBanner, uploadGrantDocument } from '$lib/utils/uploads.js';
import { formSchema } from '$lib/validation/new_grant_schema.js';
import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async (event) => {
	const grantAdmin = await event.locals.getGrantAdmin();

	if (!grantAdmin) {
		return;
	}

	try {
		const forms = await db.form.findMany({
			where: {
				organizationId: grantAdmin.organizationId
			}
		});

		return {
			form: await superValidate(zod(formSchema)),
			forms: forms
		};
	} catch (err) {
		console.log(err);
		return;
	}
};

export const actions: Actions = {
	default: async (event) => {
		const grantAdmin = await event.locals.getGrantAdmin();

		if (!grantAdmin) {
			fail(401);
		}

		try {
			const form = await superValidate(event, zod(formSchema));

			if (!form.valid) {
				fail(
					400,
					withFiles({
						form
					})
				);
			}

			const createFormsOnGrants = [];

			for (const formId of form.data.grantForms) {
				createFormsOnGrants.push({
					form: {
						connect: {
							id: formId
						}
					}
				});
			}

			const createRequiredDocuments = [];

			for (const doc of form.data.requiredDocuments) {
				createRequiredDocuments.push({
					prompt: doc
				});
			}

			const grant = await db.grant.create({
				data: {
					title: form.data.grantName,
					description: form.data.grantDescription,
					acceptingApplications: form.data.acceptingApplications,
					rangeLow: form.data.rangeLow,
					rangeHigh: form.data.rangeHigh,
					expirationDate: new Date(form.data.expirationDate),
					sector: form.data.sector,
					organizationId: grantAdmin.organizationId,
					bannerAlt: form.data.bannerAlt || null,
					formsOnGrants: {
						create: createFormsOnGrants
					},
					requiredDocuments: {
						create: createRequiredDocuments
					}
				}
			});

			if (form.data.banner) {
				const { data, error } = await uploadBanner(
					grant.id,
					form.data.banner,
					event.locals.supabase
				);

				if (!data) {
					console.log(error);
					return fail(500);
				}
			}

			for (const doc of form.data.documents) {
				const { data, error } = await uploadGrantDocument(grant.id, doc, event.locals.supabase);
				if (!data) {
					console.log(error);
					return fail(500);
				}
			}
		} catch (err) {
			console.log(err);
			return fail(500);
		}

		redirect(
			301,
			'/grant-admin/grants',
			{
				type: 'success',
				richColors: true,
				message: 'Successfully created grant'
			},
			event
		);
	}
};
