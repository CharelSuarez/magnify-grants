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

export function getAge(birthDate: Date) {
	const today = new Date();
	let age = today.getFullYear() - birthDate.getFullYear();
	const month = today.getMonth() - birthDate.getMonth();
	if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}
