import { redirect, type Actions, fail } from "@sveltejs/kit";
import { redirect as redirectFlash } from "sveltekit-flash-message/server";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { profileSchema } from "$lib/validation/profile_schema";

export const load: PageServerLoad = async (event) => {

    if (!event.locals.user) {
        redirect(303, "/");
    }

    if (await event.locals.getUserProfile()) {
        redirect(303, "/");
    }

    return {
        form: await superValidate(zod(profileSchema)),
    };
};

export const actions: Actions = {

    default: async (event) => {

        // should not be able to submit this form but just in case these checks

        const user = event.locals.user;

        if (!user) {
            return fail(401);
        }

        if (!user.emailVerified) {
            return fail(401);
        }

        if (await event.locals.getUserProfile()) {
            return fail(401);
        }

        const form = await superValidate(event, zod(profileSchema));

        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        await db.user.update({
            where: {
                id: user.id
            },
            data: {
                profile: {
                    create: {
                        firstName: form.data.firstName,
                        lastName: form.data.lastName
                    }
                }
            }
        });

        redirectFlash(303, "/", {
            type: "success",
            richColors: true,
            message: "Your profile has been created",
        }, event);

    },

};