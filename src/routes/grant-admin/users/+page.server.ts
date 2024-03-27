import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const response = await db.profile.findMany({
		select: {
			id: true,
			firstName: true,
			lastName: true,
			dateOfBirth: true
		}
	});
	return { response };
};
