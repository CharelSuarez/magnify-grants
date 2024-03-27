import { db } from '$lib/server/db';
import type { PageServerLoad } from '../../../../../.svelte-kit/types/src/routes';
import { fromShort } from '$lib/utils/url';

/** @type {import('../../../../../.svelte-kit/types/src/routes').PageServerLoad} */
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
