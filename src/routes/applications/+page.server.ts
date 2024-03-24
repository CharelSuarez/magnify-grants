import { filterSchema } from "$lib/validation/app_schema";
import { redirect, type Actions, fail } from "@sveltejs/kit";
import { redirect as redirectFlash } from "sveltekit-flash-message/server";
import { message, setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { lucia } from "$lib/server/auth";

export const load: PageServerLoad = async (event) => {
    // if (!event.locals.user) {
    //     redirect(303, "/");
    // }

    return {
        filter: await superValidate(zod(filterSchema)),
    };
};

export const actions: Actions = {

    default: async (event) => {
        const form = await superValidate(event, zod(filterSchema));
        console.log(form.valid);
        console.log(form.data);
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }
    },

};