import { db } from "$lib/server/db"
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";

export const verifyVerificationCode = async (userId: string, code: string) => {

    const deleteCode = async () => {
        await db.emailVerificationCode.delete({
            where: {
                code: code,
                userId: userId,
            }
        });
    };

    try {

        const dbCode = await db.emailVerificationCode.findFirst({
            where: {
                userId: userId,
            }
        })

        if (!dbCode) {
            return false;
        }

        if (!isWithinExpirationDate(dbCode.expiresAt)) {
            deleteCode();
            return false;
        }

        if (dbCode.code !== code || dbCode.userId !== userId) {
            return false;
        }

        deleteCode();

        return true;

    } catch (err) {
        console.log(err);
        return false;
    }
}

export const generateEmailVerificationCode = async (userId: string) => {

    const code = generateRandomString(8, alphabet("0-9", "A-Z", "a-z"));

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