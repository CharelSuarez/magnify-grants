import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async (event) => {

    const user = event.locals.user;

    return {
        loggedIn: user !== null
    }
});