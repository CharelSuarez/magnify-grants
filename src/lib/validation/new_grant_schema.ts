import { z } from 'zod';

import { Sector } from '@prisma/client';

export const formSchema = z.object({
	grantName: z.string().min(1).max(50),
	grantDescription: z.string().min(1).max(500),
	grantForms: z.array(z.string()),
	acceptingApplications: z.boolean(),
	rangeLow: z.coerce.number(),
	rangeHigh: z.coerce.number(),
	expirationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	sector: z.nativeEnum(Sector),
	banner: z
		.instanceof(File)
		.optional()
		.refine((f) => !f || f.size < 10_000_000, 'Max 10 mB upload size'),
	bannerAlt: z.string().min(1).max(25).optional(),
	documents: z.array(
		z.instanceof(File).refine((f) => !f || f.size < 10_000_000, 'Max 10 mB upload size')
	)
});

export type FormSchema = typeof formSchema;
