import { db } from "$lib/server/db"
import { TimeSpan, createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";

export const generateEmailVerificationCode = async (userId: string) => {

    const code = generateRandomString(8, alphabet("0-9"));

    const expiresAt = createDate(new TimeSpan(5, "m"));

    try {

        await db.emailVerificationCode.upsert({
            where: {
                userId: userId,
            },
            update: {
                code: code,
                expiresAt: expiresAt,
            },
            create: {
                userId: userId,
                code: code,
                expiresAt: expiresAt,
            }
        });

        return code;

    } catch (err) {
        console.log(err);
    }

    return null;
}