import { db } from '$lib/server/db';
import { redirect } from 'sveltekit-flash-message/server';
import type { LayoutServerLoad } from './$types';

/** @type {import('./$types').PageServerLoad} */
export const load: LayoutServerLoad = async (event) => {
	//TODO: Verify user

	try {
		const form = await db.form.findFirst({
			where: {
				id: event.params.formId
			},
			include: {
				fields: true
			}
		});

		if (!form) {
			redirect(
				500,
				'/grant-admin/form-builder/',
				{
					richColors: true,
					type: 'error',
					message: 'Form not found'
				},
				event
			);
		}

		return {
			form: form
		};
	} catch (err) {
		redirect(
			500,
			'/grant-admin/form-builder/',
			{
				richColors: true,
				type: 'error',
				message: 'Server error occurred'
			},
			event
		);
	}
};
