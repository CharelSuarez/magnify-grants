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
						name: true
					}
				}
			}
		});

		return { grant, forms };
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
