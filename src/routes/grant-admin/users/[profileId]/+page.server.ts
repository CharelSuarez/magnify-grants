import { db } from '$lib/server/db';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { fromShort } from '$lib/utils/url';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async (event) => {
	//TODO: Verify user

	try {
		const profile = await db.profile.findFirst({
			where: {
				id: fromShort(event.params.profileId)
			},
			select: {
				firstName: true,
				lastName: true,
				dateOfBirth: true,
				user: {
					select: {
						role: true
					}
				}
			}
		});

		if (!profile) {
			redirect(
				500,
				'/grant-admin/users/',
				{
					richColors: true,
					type: 'error',
					message: 'Profile not found'
				},
				event
			);
		}

		return {
			profile: profile
		};
	} catch (err) {
		redirect(
			500,
			'/grant-admin/users/',
			{
				richColors: true,
				type: 'error',
				message: 'Server error occurred'
			},
			event
		);
	}
};
