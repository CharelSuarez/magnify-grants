

// See https://kit.svelte.dev/docs/types#app

import type { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import type { PrismaClient } from "@prisma/client";

// for information about these interfaces
declare global {
	namespace App {
		interface PageData {
			flash?: {
				message: string,
				type: "success" | "error" | "message",
				description?: string,
				richColors?: boolean
			};
		}
	}
	// eslint-disable-next-line no-var
	var db: PrismaClient
	// eslint-disable-next-line no-var
	var adapter: PrismaAdapter

}

export {};
