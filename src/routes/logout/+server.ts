import { lucia } from "$lib/server/auth";
import { type RequestHandler } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";
import { t } from '$lib/i18n/i18n';

export const POST: RequestHandler = async (event) => {

    const user = event.locals.user;

    // redundant but keep in case
    if (!user) {
        redirect(303, "/");
    }

    await lucia.invalidateUserSessions(user.id);

    redirect(303, "/", {
        type: "success",
        richColors: true,
        message: "Logged out successfully",
    }, event);
};