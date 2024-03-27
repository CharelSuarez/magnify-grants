export const getProfile = async (userId: string) => {

    try {

        const profile = await db.profile.findFirst({
            where: {
                userId: userId,
            }
        });

        return profile;

    } catch (err) {
        console.log(err)
    }

    return null;
}

export function getAge(birthDate : Date) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}