import { db } from '$lib/server/db';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { fromShort } from '$lib/utils/url';

export const load: PageServerLoad = async (event) => {
	// TODO: Verify user...

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
				`/grants-user/ce191ebf-ace0-4224-8c78-5b0ad38a7c66`, // TODO Change to the grant exploration page!
				{
					richColors: true,
					type: 'error',
					message: 'Grant not found!'
				},
				event
			);
		}

		const forms = await db.form.findMany({
			where: {
				grantId: grant.id
			},
			select: {
				id: true,
				name: true
			}
		});

		return { grant, forms };
	} catch (err) {
		redirect(
			307,
			'/grants-user/ce191ebf-ace0-4224-8c78-5b0ad38a7c66', // TODO Change to the grant exploration page!
			{
				richColors: true,
				type: 'error',
				message: 'Server error occurred!'
			},
			event
		);
	}
};
