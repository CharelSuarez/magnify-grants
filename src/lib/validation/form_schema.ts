import { FieldType } from '@prisma/client';
import { z } from 'zod';

const fieldSchema = z.object({
	type: z.nativeEnum(FieldType),
	index: z.number().min(0),
	prompt: z.string().min(1, 'Your prompt is too short').max(255, 'Your prompt is too long'),
	options: z.array(
		z.string().min(1, 'Your option prompt is too short').max(255, 'Your option prompt is too long')
	)
});

const fieldsSchema = z.array(fieldSchema);

const formSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string().min(1, 'Your name is too short').max(25, 'Your name is too long'),
	description: z
		.string()
		.min(1, 'Your description is too short')
		.max(255, 'Your description is too long'),
	fields: fieldsSchema
});

export { fieldSchema, fieldsSchema, formSchema };
export type FieldSchema = typeof fieldSchema;
export type FieldsSchema = typeof fieldsSchema;
export type FormSchema = typeof formSchema;
