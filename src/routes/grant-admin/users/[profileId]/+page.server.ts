import { db } from '$lib/server/db';
import { redirect, setFlash } from 'sveltekit-flash-message/server';
import type { Actions, PageServerLoad } from './$types';
import { fromShort } from '$lib/utils/url';
import { fail } from '@sveltejs/kit';
import { Role, type GrantAdmin } from '@prisma/client';

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
				307,
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
			307,
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

export const actions: Actions = {
	default: async (event) => {
		const grantAdmin: GrantAdmin = await event.locals.getGrantAdmin();

		if (!grantAdmin) {
			return fail(401);
		}

		try {
			await db.profile.update({
				where: {
					id: fromShort(event.params.profileId)
				},
				data: {
					user: {
						update: {
							data: {
								role: Role.GRANT_ADMIN,
								gAdminInstance: {
									create: {
										organization: {
											connect: {
												id: grantAdmin.organizationId
											}
										}
									}
								}
							}
						}
					}
				},
				include: {
					user: {
						include: {
							gAdminInstance: true
						}
					}
				}
			});

			setFlash(
				{ type: 'success', richColors: true, message: 'Successfully promoted user' },
				event.cookies
			);
			return { success: true };
		} catch (err) {
			console.log(err);
		}

		return fail(500);
	}
};
