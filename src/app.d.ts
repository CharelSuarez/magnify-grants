

// See https://kit.svelte.dev/docs/types#app

import type { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import type { PrismaClient } from "@prisma/client";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	// eslint-disable-next-line no-var
	var db: PrismaClient
	// eslint-disable-next-line no-var
	var adapter: PrismaAdapter

}

export {};
