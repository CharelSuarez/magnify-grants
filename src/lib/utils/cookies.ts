import type { RequestEvent } from "@sveltejs/kit";
import type { Cookie } from "lucia";

export const setCookie = (cookie: Cookie, event: RequestEvent) => {
    event.cookies.set(cookie.name, cookie.value, {
        path: ".",
        ...cookie.attributes,
    });
}