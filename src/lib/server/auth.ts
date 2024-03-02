import { Lucia, TimeSpan } from "lucia";
import { env } from "$env/dynamic/private";
import { adapter } from "./db";
import type { Profile } from "@prisma/client";

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        name: "session",
        expires: false,
        attributes: {
            secure: env.NODE_ENV === "PRODUCTION"
        }
    },
    sessionExpiresIn: new TimeSpan(30, "d"),
    getUserAttributes: (attributes) => {
        return {
            userId: attributes.id,
            email: attributes.email,
            emailVerified: attributes.emailVerified,
            profile: attributes.profile,
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
    id: string
    email: string,
    emailVerified: string,
    profile: Profile
}
