import { Lucia, TimeSpan } from 'lucia';
import { env } from '$env/dynamic/private';
import { adapter } from './db';
import type { Role } from '@prisma/client';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name: 'session',
		expires: false,
		attributes: {
			secure: env.NODE_ENV === 'PRODUCTION'
		}
	},
	sessionExpiresIn: new TimeSpan(30, 'd'),
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			emailVerified: attributes.emailVerified,
			role: attributes.role
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email: string;
	emailVerified: string;
	role: Role;
}
