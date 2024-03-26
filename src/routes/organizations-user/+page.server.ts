import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ params }) => {
	const organizations = await db.organization.findMany({});

	return {
		organizations
	};
};
