import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const grantAdmin = await event.locals.getGrantAdmin();

	if (!grantAdmin) {
		return;
	}

	const response = await db.form.findMany({
		where: {
			organizationId: grantAdmin.organizationId
		}
	});
	return { response };
};
