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