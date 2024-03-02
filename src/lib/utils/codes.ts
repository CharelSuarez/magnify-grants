import { db } from "$lib/server/db"
import { TimeSpan, createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";

export const generateEmailVerificationCode = async (userId: string) => {

    const code = generateRandomString(8, alphabet("0-9"));

    const expiresAt = createDate(new TimeSpan(5, "m"));

    try {
        await db.emailVerificationCode.upsert({
            where: {
                user_id: userId,
            },
            update: {
                code: code,
                expires_at: expiresAt,
            },
            create: {
                user_id: userId,
                code: code,
                expires_at: expiresAt,
            }
        });
    } catch (err) {
        console.log(err);
    }


}