import { db } from '$lib/server/db';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { fromShort } from '$lib/utils/url';

export const load: PageServerLoad = async (event) => {
	try {
		const id = fromShort(event.params.grantID);

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

		const forms = await db.formsOnGrants.findMany({
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
	}
};
