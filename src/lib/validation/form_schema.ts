import { FieldType, type Field } from '@prisma/client';
import { z, type ZodTypeAny } from 'zod';

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

/*
 * Generates a dynamic schema for form submissions based on the types of the fields in the form.
 */
export function getFormSubmissionSchema(fields: Field[]) {
	const form : {[index : string]: ZodTypeAny} = {};

	const fieldMap = Object.fromEntries(fields.map((field) => [field.id, field]));

	fields.forEach((field) => {
		switch (field.type) {
			case FieldType.ShortAnswer:
				form[field.id] = z.string().min(1, {message: "A response is required!"}).max(250);
				break;
			case FieldType.Paragraph:
				form[field.id] = z.string().min(1, {message: "A response is required!"}).max(1000);
				break;
			case FieldType.MultipleChoice:
			case FieldType.Dropdown: {
				const firstOption = field.options[0] || "";
				const restOptions = field.options.slice(1);
				const options = [firstOption, ...restOptions] as const;
				form[field.id] = z.enum(options);
				break;
			}
			case FieldType.Checkbox: {
				const firstOption = field.options[0] || "";
				const restOptions = field.options.slice(1);
				const options = [firstOption, ...restOptions] as const;
				form[field.id] = z.enum(options).array().nonempty({message: "At least one option must be selected!"});
				break;
			}
			case FieldType.Date:
				form[field.id] = z.date();
				break;
			case FieldType.LinearScale:
				form[field.id] = z.number().int().min(1).max(10); // TODO Linear scale...
				break;
			case FieldType.Time: // TODO Time format...
				form[field.id] = z.string().regex(/^\d{2}:\d{2}(?:AM|PM)$/, {message: "Invalid time format! Use HH:MMAM or HH:MMPM."});
				break;
			default:
				break;
		}
	});
	return z.object(form)
		.refine((formFields) => {
			for (const fieldId in formFields) {
				const field = fieldMap[fieldId];
				if (field == null) {
					return false;
				}
			}
			return true;
		}, {message: "Invalid field(s) in form!"});
}

/*
 * Generates a dynamic schema for form drafts based on the types of the fields in the form.
 */
export function getFormDraftSchema(fields: Field[]) {
	const form : {[index : string]: ZodTypeAny} = {};

	const fieldMap = Object.fromEntries(fields.map((field) => [field.id, field]));

	fields.forEach((field) => {
		switch (field.type) {
			case FieldType.ShortAnswer:
				form[field.id] = z.string().max(250 * 2).optional();
				break;
			case FieldType.Paragraph:
				form[field.id] = z.string().max(1000 * 2).optional();
				break;
			case FieldType.MultipleChoice:
			case FieldType.Dropdown: {
				const firstOption = field.options[0] || "";
				const restOptions = field.options.slice(1);
				const options = [firstOption, ...restOptions] as const;
				form[field.id] = z.enum(options).optional();
				break;
			}
			case FieldType.Checkbox: {
				const firstOption = field.options[0] || "";
				const restOptions = field.options.slice(1);
				const options = [firstOption, ...restOptions] as const;
				form[field.id] = z.enum(options).array().optional();
				break;
			}
			case FieldType.Date:
				form[field.id] = z.date().optional();
				break;
			case FieldType.LinearScale:
				form[field.id] = z.number().int().min(1).max(10).optional(); // TODO Linear scale...
				break;
			case FieldType.Time: // TODO Time format...
				form[field.id] = z.string().regex(/^\d{2}:\d{2}(?:AM|PM)$/, {
					message: "Invalid time format! Use HH:MMAM or HH:MMPM."}).optional();
				break;
			default:
				break;
		}
	});
	return z.object(form)
		.refine((formFields) => {
			for (const fieldId in formFields) {
				const field = fieldMap[fieldId];
				if (field == null) {
					return false;
				}
			}
			return true;
		}, {message: "Invalid field(s) in form!"});
}

export { fieldSchema, fieldsSchema, formSchema };
export type FieldSchema = typeof fieldSchema;
export type FieldsSchema = typeof fieldsSchema;
export type FormSchema = typeof formSchema;
