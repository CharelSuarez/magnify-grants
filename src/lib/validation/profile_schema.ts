import { z } from 'zod';

export const profileSchema = z.object({
	firstName: z.string().min(1).max(20),
	lastName: z.string().min(1).max(20),
	dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
});

export type ProfileSchema = typeof profileSchema;
