import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ params }) => {

	const grants = await db.grant.findMany({
		where: {
			organizationId: params.organization_id
		},
		include: {
			organization: true
		}
	});

	return {
		grants: grants
	};
};
