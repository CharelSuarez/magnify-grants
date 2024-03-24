import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
    const user = event.locals.user;

    if (!user) {
        error(401, "No session!");
    }

    return new Response("Hello...");
};