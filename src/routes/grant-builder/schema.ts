import { z } from "zod";

export const formSchema = z.object({
	test: z.string().min(1).max(50),
});

export type FormSchema = typeof formSchema;