import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client"

const db = globalThis.db || new PrismaClient();

if (process.env.NODE_ENV === "development") {
	globalThis.db = db;
}

const adapter = globalThis.adapter || new PrismaAdapter(db.session, db.user);

export { db, adapter };