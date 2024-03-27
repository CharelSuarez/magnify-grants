import { lucia } from '$lib/server/auth';
import { setCookie } from '$lib/utils/cookies';
import { getProfile } from '$lib/utils/user';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// TODO: Implement this
// enum ALLOWED {
// 	ALWAYS,
// 	HAS_USER,
// 	IS_VERIFIED,
// 	HAS_PROFILE,
// }

// const routes = {
// 	login: {
// 		route: '/login',
// 		allowed: ALLOWED.ALWAYS
// 	},
// 	signup: {
// 		route: "/signup",
// 		allowed: ALLOWED.ALWAYS
// 	}
// }

const alwaysAllowed = [
	'/login',
	'/signup',
	'/reset-password',
	'/applications',
	'/grant-user',
	'/grants',
	'/grant-builder',
	'/grant-preview',
	'/grant-admin', // temp
	'/analytics',
	'/organizations-user',
	'/grant'
];

// inherits from alwaysAllowed
const userAllowed = ['/logout', '/email-verification'];

// inherits from userAllowed
const verifiedAllowed = ['/profile/create'];

// inherits from verifiedAllowed
const hasProfileAllowed: string[] = [];

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
};

const authenticateRoute: Handle = async ({ event, resolve }) => {
	const user = event.locals.user;

	const visited = (routes: string[]): boolean => {
		for (const route of routes) {
			if (event.url.pathname.startsWith(route)) {
				return true;
			}
		}
		return false;
	};

	const allowed = visited(alwaysAllowed);

	if (allowed || event.url.pathname == '/') {
		return resolve(event);
	}

	const visitedUserAllowed = visited(userAllowed);

	if (user && visitedUserAllowed) {
		return resolve(event);
	}

	const visitedVerifiedAllowed = visited(verifiedAllowed);

	if (user && user.emailVerified && visitedVerifiedAllowed) {
		return resolve(event);
	} else if (user && !user.emailVerified) {
		redirect(303, '/email-verification');
	}

	const visitedHasProfileAllowed = visited(hasProfileAllowed);

	if (user) {
		const profile = await getProfile(user.id);
		if (profile && visitedHasProfileAllowed) {
			return resolve(event);
		} else if (!profile) {
			redirect(303, '/profile/create');
		}
	}

	// if we reached here they tried to access a bad route
	redirect(303, '/');
};

const addFunctionHooks: Handle = async ({ event, resolve }) => {
	event.locals.getUserProfile = async () => {
		if (!event.locals.user) {
			return null;
		}

		return await getProfile(event.locals.user.id);
	};

	return resolve(event);
};

export const handle: Handle = sequence(verifySession, authenticateRoute, addFunctionHooks);
