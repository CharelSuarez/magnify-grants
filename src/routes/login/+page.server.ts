import { message, setError, superValidate } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { loginSchema } from "$lib/validation/auth_schema";
import { redirect, type Actions, fail } from "@sveltejs/kit";
import { redirect as redirectFlash } from "sveltekit-flash-message/server";
import { db } from "$lib/server/db";
import { Argon2id } from "oslo/password";
import { lucia } from "$lib/server/auth";
import { setCookie } from "$lib/utils/cookies";

export const load: PageServerLoad = async (event) => {

    const user = event.locals.user;

    if (user) {
        if (!user.emailVerified) {
            redirect(300, "/email-verification");
        }
        redirect(300, "/");
    }

    return {
        form: await superValidate(zod(loginSchema)),
    };
};

export const actions: Actions = {

    default: async (event) => {

        const form = await superValidate(event, zod(loginSchema));

        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const { email, password } = form.data;

        const user = await db.user.findFirst({
            where: {
                email: email
            },
        });

        if (!user) {
            const errMsg = "Invalid credentials";
            setError(form, "email", errMsg);
            setError(form, "password", errMsg);
            return message(form, {
                type: "error",
                text: errMsg
            });
        }

        const validPassword = await new Argon2id().verify(user.hashedPassword, password);

        if (!validPassword) {
            const errMsg = "Invalid credentials";
            setError(form, "email", errMsg);
            setError(form, "password", errMsg);
            return message(form, {
                type: "error",
                text: errMsg
            });
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        setCookie(sessionCookie, event);

        const route = user.emailVerified ? "/" : "/email-verification";

        redirectFlash(303, route, {
            type: "success",
            richColors: true,
            message: "Logged in successfully",
            description: form.data.email
        }, event);
    },

};
