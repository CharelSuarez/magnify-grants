import { formSchema } from '$lib/validation/new_grant_schema.js';
import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
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
				fail(400, {
					form
				});
			}

			await db.grant.create({
				data: {
					title: form.data.grantName,
					description: form.data.grantDescription,
					acceptingApplications: form.data.acceptingApplications,
					rangeLow: form.data.rangeLow,
					rangeHigh: form.data.rangeHigh,
					expirationDate: new Date(form.data.expirationDate),
					sector: form.data.sector,
					organizationId: grantAdmin.organizationId
				}
			});
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
