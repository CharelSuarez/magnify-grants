import { z } from "zod";

export const profileSchema = z.object({
    firstName: z.string().min(1).max(20),
    lastName: z.string().min(1).max(20)
});

export type ProfileSchema = typeof profileSchema;