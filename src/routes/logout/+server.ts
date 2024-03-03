import { lucia } from "$lib/server/auth";
import { type RequestHandler } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";

export const POST: RequestHandler = async (event) => {

    const user = event.locals.user;

    // redundant but keep in case
    if (!user) {
        redirect(300, "/");
    }

    await lucia.invalidateUserSessions(user.id);

    redirect(303, "/", {
        type: "success",
        richColors: true,
        message: "Logged out successfully",
    }, event);
};