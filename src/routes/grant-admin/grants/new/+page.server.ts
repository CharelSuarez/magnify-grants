import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
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
				organizationId: '81f57db4-ca65-4223-a722-a44298195838' // TODO - get organization from user profile?
			}
		});

		return {
			form
		};
	}
};
