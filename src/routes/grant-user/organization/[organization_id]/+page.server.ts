import { db } from '$lib/server/db';
import { fromShort } from '$lib/utils/url';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const grants = await db.grant.findMany({
		where: {
			organizationId: fromShort(params.organization_id)
		},
		include: {
			organization: true
		}
	});

	return {
		grants: grants
	};
};
