import { z } from 'zod';

import { Sector } from '@prisma/client';

export const formSchema = z.object({
	grantName: z.string().min(1).max(50),
	grantDescription: z.string().min(1).max(500),
	acceptingApplications: z.boolean(),
	rangeLow: z.coerce.number(),
	rangeHigh: z.coerce.number(),
	expirationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	sector: z.nativeEnum(Sector)
});

export type FormSchema = typeof formSchema;