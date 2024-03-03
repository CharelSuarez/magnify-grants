import { lucia } from "$lib/server/auth";
import { setCookie } from "$lib/utils/cookies";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const alwaysAllowed = ["/", "/login", "/signup", "/reset-password"];

// inherits from alwaysAllowed
const userAllowed = ["/logout", "/email-verification"]

// inherits from userAllowed
const verifiedAllowed: string[] = [];

const verifySession: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get(lucia.sessionCookieName);

    if (!sessionId) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }

    const { session, user } = await lucia.validateSession(sessionId);

    if (session && session.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id);
        setCookie(sessionCookie, event);
    }

    if (!session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        setCookie(sessionCookie, event);
    }

    event.locals.user = user;
    event.locals.session = session;

    return resolve(event);
}

const authenticateRoute: Handle = async ({ event, resolve }) => {

    const user = event.locals.user;

    const visited = (routes: string[]): boolean => {
        for (const route of routes) {
            if (event.url.pathname.startsWith(route)) {
                return true
            }
        }
        return false;
    }

    const allowed = visited(alwaysAllowed);

    if (allowed) {
        return resolve(event);
    }

    const visitedUserAllowed = visited(userAllowed);

    if (user && visitedUserAllowed) {
        return resolve(event);
    }

    const visitedVerifiedAllowed = visited(verifiedAllowed);

    if (user?.emailVerified && visitedVerifiedAllowed) {
        return resolve(event);
    }

    // if we reached here they tried to access a bad route
    redirect(303, "/");
}

export const handle: Handle = sequence(
    verifySession,
    authenticateRoute,
);