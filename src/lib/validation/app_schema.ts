import { z } from "zod";
// import { AcceptStatus } from "$lib/custom_components/ui/application-table/app-acceptance-statuses";
// import { CompleteStatus } from "$lib/custom_components/ui/application-table/app-complete-statuses";

// export const completeStatuses = z.enum([CompleteStatus.COMPLETE.toString(), CompleteStatus.INCOMPLETE.toString()]);

// export const applicationStatuses = z.enum([AcceptStatus.PENDING.toString(), 
//     AcceptStatus.ACCEPTED.toString(), AcceptStatus.REJECTED.toString()]);

export const filterSchema = z.object({
    grant: z.string(),
    
    minAge: z.number().optional(),
    maxAge: z.number().optional(),

    complete: z.boolean().default(true),
    incomplete: z.boolean().default(false),
    pending: z.boolean().default(true),

    accepted: z.boolean().default(false),
    rejected: z.boolean().default(false),
});

export type FilterSchema = typeof filterSchema;