import { Lucia } from "lucia";
import { env } from "$env/dynamic/private";

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: env.NODE_ENV === "PRODUCTION"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            email: attributes.email
        }
    }
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia
        DatabaseUserAttributes: DatabaseUserAttributes
    }
}

interface DatabaseUserAttributes {
    email: string
}
