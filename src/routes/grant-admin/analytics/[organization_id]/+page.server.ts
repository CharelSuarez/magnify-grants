import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const organization = await db.organization.findUnique({
		where: {
			id: params.organization_id
		}
	});

	return {
		organization
	};
};
