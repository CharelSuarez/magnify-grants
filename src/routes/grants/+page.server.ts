import { db } from '$lib/server/db';
import type { PageServerLoad } from '../../../.svelte-kit/types/src/routes/grants/$types';

export const load = (async () => {
	const response = await db.grant.findMany({
		include: {
			organization: true
		}
	});
	return { response };
}) satisfies PageServerLoad;
