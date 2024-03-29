import { goto } from '$app/navigation';
import { db } from '$lib/server/db';
import { redirect, setFlash } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';

/** @type {import('./$types').PageServerLoad} */

export const load: PageServerLoad = async (event) => {

    if(!event.locals.user){
        redirect(
            307,
            `/grant-user`, 
            {
                richColors: true,
                type: 'error',
                message: 'Not Logged In!'
            },
            event
        );
    }

    const user = event.locals.user?.id

	const submission = await db.submission.findMany({
        where : {
            userId: user
        },
        include: {
            grant: {
                select:{
                    title: true,
                    description: true,
                    expirationDate:true,
                }
            }
        },
        orderBy: {
            submissionDate: 'desc'
        }
	});




	return {
		grants: submission || [],
	};
};

