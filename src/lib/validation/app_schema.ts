import type { ApplicationStatus } from '@prisma/client';
import { z } from 'zod';

export type Application = {
	id: string;
	grantTitle: string | undefined;
	submissionDate: Date;
	status: ApplicationStatus;
	userId: string;
	userProfileName: string;
	userProfileEmail: string;
	userProfileDateOfBirth?: Date | null;
};

export type Applications = {
	applications: Application[];
};

export const filterSchema = z
	.object({
		grant: z.string().optional(),

		minAge: z.number().optional(),
		maxAge: z.number().optional(),

		accepted: z.boolean().default(false),
		pending: z.boolean().default(true),
		rejected: z.boolean().default(false)
	})
	.refine(
		(data) => {
			if (data.minAge != null && data.maxAge != null && data.minAge > data.maxAge) {
				return false;
			}
			return true;
		},
		{
			message: 'Min age must be less than max age.',
			path: ['minAge']
		}
	)
	.refine(
		(data) => {
			return data.accepted || data.pending || data.rejected;
		},
		{
			message: 'Must specify one of accepted, pending, or rejected.',
			path: ['accepted']
		}
	);

export type FilterSchema = typeof filterSchema;

const ACCEPTED_FILE_TYPES = [
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/pdf',
	'image/png',
	'image/jpeg'
];

export const requiredDocSchema = z.object({
	file: z
		.instanceof(File)
		.refine((file) => file?.size <= 10_000_000, 'Max file size is 10 mB')
		.refine(
			(file) => ACCEPTED_FILE_TYPES.includes(file?.type),
			'Only .doc, .docx, .pdf, .jpg, .jpeg and .png formats are supported.'
		)
});

export const formDocSchema = z.object({
	documents: z.array(
		z.object({
			file: z
				.instanceof(File)
				.refine((file) => file?.size <= 10_000_000, 'Max file size is 10 mB')
				.refine(
					(file) => ACCEPTED_FILE_TYPES.includes(file?.type),
					'Only .doc, .docx, .pdf, .jpg, .jpeg and .png formats are supported.'
				),
			id: z.string()
		})
	),
	grantId: z.string()
});

export type RequiredDocSchema = typeof requiredDocSchema;
export type FormDocSchema = typeof formDocSchema;
