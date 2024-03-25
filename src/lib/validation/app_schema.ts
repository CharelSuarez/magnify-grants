import type { ApplicationStatus } from "@prisma/client";
import { z } from "zod";
// import { AcceptStatus } from "$lib/custom_components/ui/application-table/app-acceptance-statuses";
// import { CompleteStatus } from "$lib/custom_components/ui/application-table/app-complete-statuses";

// export const completeStatuses = z.enum([CompleteStatus.COMPLETE.toString(), CompleteStatus.INCOMPLETE.toString()]);

// export const applicationStatuses = z.enum([AcceptStatus.PENDING.toString(), 
//     AcceptStatus.ACCEPTED.toString(), AcceptStatus.REJECTED.toString()]);

export type Applications = {
    applications: {   
        id: string,
        grantTitle: string | undefined,
        version: number,
        complete: boolean,
        status: ApplicationStatus,
        userId: string,
        userProfileName: string,
        userProfileEmail: string,
        userProfileDateOfBirth?: Date | null
    }[]
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