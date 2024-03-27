import type { ApplicationStatus } from "@prisma/client";
import { z } from "zod";

export type Application = {
    id: string,
    grantTitle: string | undefined,
    version: number,
    complete: boolean,
    status: ApplicationStatus,
    userId: string,
    userProfileName: string,
    userProfileEmail: string,
    userProfileDateOfBirth?: Date | null
};

export type Applications = {
    applications: Application[]
};

export const filterSchema = z.object({
    grant: z.string().optional(),
    
    minAge: z.number().optional(),
    maxAge: z.number().optional(),

    complete: z.boolean().default(true),
    incomplete: z.boolean().default(false),

    accepted: z.boolean().default(false),
    pending: z.boolean().default(true),
    rejected: z.boolean().default(false),
});

export type FilterSchema = typeof filterSchema;