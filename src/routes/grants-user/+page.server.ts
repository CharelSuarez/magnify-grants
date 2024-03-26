import { db } from '$lib/server/db';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


/** @type {import('./$types').PageServerLoad} */

export const load: PageServerLoad = async () => {

	const grants = await db.grant.findMany({});

    const organizations = await db.organization.findMany({
        where: {
            grants: {
                some: {}
            },
        }
    });
	return {
		grants: grants,
        organizations: organizations
	};
};
