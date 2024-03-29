import { db } from '$lib/server/db';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { fromShort } from '$lib/utils/url';

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
				}
			}
		});

		if (!grant) {
			redirect(
				307,
				`/grant-user`, // TODO Change to the grant exploration page!
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
								updated: true,
								complete: true
							}
						}
					}
				}
			}
		});

		// Flatten the form and add application field for the latest one.
		const formsWithApplication : {
			name: string;
			id: string;
			applications: {
				complete: boolean;
				updated: Date;
			}[];
			application?: {
				complete: boolean;
			}
		}[] = forms.map((form) => form.form);

		formsWithApplication.forEach((form) => {
			// Find the application with the most recent date.
			form.application = form.applications.length == 0 ? undefined : form.applications.reduce((form, nextForm) => {
				return nextForm.updated > form.updated ? nextForm : form;
			}, form.applications[0]);
		});

		return { grant, forms: formsWithApplication };
	} catch (err) {
		console.log(err);
		redirect(
			307,
			'/grant-user', // TODO Change to the grant exploration page!
			{
				richColors: true,
				type: 'error',
				message: 'Server error occurred'
			},
			event
		);
	}
};
