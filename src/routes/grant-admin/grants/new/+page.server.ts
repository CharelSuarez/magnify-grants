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
					formsOnGrants: {
						create: createFormsOnGrants
					}
				}
			});

			if (form.data.banner) {
				const { data, error } = await event.locals.supabase.storage
					.from('banners')
					.upload(`${grant.id}.png`, form.data.banner, {
						cacheControl: '3600',
						upsert: true
					});

				if (!data) {
					console.log(error);
					return fail(500);
				}
			}

			if (form.data.documents.length !== 0) {
				for (const doc of form.data.documents) {
					const { data, error } = await event.locals.supabase.storage
						.from('documents')
						.upload(`${grant.id}/${doc.name}`, doc, {
							cacheControl: '3600',
							upsert: true
						});

					if (!data) {
						console.log(error);
						return fail(500);
					}
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
