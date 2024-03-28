import { db } from '$lib/server/db';

export const getProfile = async (userId: string) => {
	try {
		const profile = await db.profile.findFirst({
			where: {
				userId: userId
			}
		});

		return profile;
	} catch (err) {
		console.log(err);
	}

	return null;
};

export const getGrantAdmin = async (userId: string) => {
	try {
		const grantAdmin = await db.grantAdmin.findFirst({
			where: {
				userId: userId
			}
		});

		return grantAdmin;
	} catch (err) {
		console.log(err);
	}
};
