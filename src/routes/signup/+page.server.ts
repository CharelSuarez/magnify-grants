import { signupSchema } from "$lib/validation/auth_schema";
import { message, setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { fail, type Actions } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import { db } from "$lib/server/db";
import { lucia } from "$lib/server/auth";
import { redirect } from "sveltekit-flash-message/server";
import { generateId } from "lucia";
import { generateEmailVerificationCode } from "$lib/utils/codes";
import { sendEmail } from "$lib/server/email";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(signupSchema)),
    };
};

export const actions: Actions = {

    default: async (event) => {

        const form = await superValidate(event, zod(signupSchema));

        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const { email, password } = form.data;

        const hashedPassword = await new Argon2id().hash(password);
        const userId = generateId(15);

        try {

            await db.user.create(({
                data: {
                    id: userId,
                    email: email,
                    hashedPassword: hashedPassword,
                }
            }));

            const session = await lucia.createSession(userId, {});
            const sessionCookie = lucia.createSessionCookie(session.id);

            event.cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes,
            });

        } catch (err) {

            const errMsg = "A user with that email already exists";
            setError(form, "email", errMsg);

            console.log(err);

            return message(form, {
                type: "error",
                text: errMsg
            });

        }

        const verificationCode = await generateEmailVerificationCode(userId);

        sendEmail(email, "Confirm your email", `Your verification code is ${verificationCode}`);

        redirect(303, "/", {
            type: "success",
            richColors: true,
            message: "A confirmation email has been sent to",
            description: form.data.email
        }, event);
    },

};