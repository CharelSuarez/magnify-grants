import { filterSchema, type FilterSchema, type Application} from "$lib/validation/app_schema";
import { redirect, type Actions, fail } from "@sveltejs/kit";
import { redirect as redirectFlash } from "sveltekit-flash-message/server";
import { message, setError, superValidate, type Infer } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { lucia } from "$lib/server/auth";
import { ApplicationStatus } from "@prisma/client";
import { fromShort } from "$lib/utils/url";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        redirectFlash(303, "/", {
            type: "error",
            richColors: true,
            message: "Forbidden, please log in!"
        }, event);
    }

    const grantAdmin = await event.locals.getGrantAdmin()
    if (!grantAdmin) {
        redirectFlash(303, "/", {
            type: "error",
            richColors: true,
            message: "Forbidden, no admin role!"
        }, event);
    }

    const grantIdLong = event.url.searchParams.get("grant");
    const grantId = grantIdLong ? fromShort(grantIdLong) : undefined;

    const grantFilter = { grant: grantId };
    const filter = await superValidate(grantFilter, zod(filterSchema));
    const applications : Application[] = await getApplications(filter.data, grantAdmin.organizationId);

    const grants = await db.grant.findMany({
        where: {
            organizationId: grantAdmin.organizationId
        },
        select: {
            id: true,
            title: true
        }
    });

    return { filter, applications, grants };
};

export const actions: Actions = {

    default: async (event) => {
        if (!event.locals.user) {
            redirectFlash(303, "/", {
                type: "error",
                richColors: true,
                message: "Forbidden, please log in!"
            }, event);
        }
    
        const grantAdmin = await event.locals.getGrantAdmin()
        if (!grantAdmin) {
            redirectFlash(303, "/", {
                type: "error",
                richColors: true,
                message: "Forbidden, no admin role!"
            }, event);
        }

        const filter = await superValidate(event, zod(filterSchema));
        if (!filter.valid) {
            return fail(400, { filter });
        }

        const applications : Application[] = await getApplications(filter.data, grantAdmin.organizationId);
        return { filter, applications };
    },

};

async function getApplications(form: Infer<FilterSchema>, organizationId: string) : Promise<Application[]> {
    const accepted : ApplicationStatus[] = [];
    if (form.accepted) accepted.push(ApplicationStatus.ACCEPTED);
    if (form.pending) accepted.push(ApplicationStatus.IN_PROGRESS);
    if (form.rejected) accepted.push(ApplicationStatus.REJECTED);

    let lastDob = undefined;
    if (form.minAge !== undefined) {
        lastDob = new Date();
        lastDob.setFullYear(lastDob.getFullYear() - form.minAge);
    }
    let firstDob = undefined;
    if (form.maxAge !== undefined) {
        firstDob = new Date();
        firstDob.setFullYear(firstDob.getFullYear() - form.maxAge);
    }

    const applications = await db.submission.findMany({
        where: {
            grant: {
                id: form.grant,
                organizationId: organizationId,
            },
            status: {
                in: accepted,
            },
            user: {
                is: {
                    // User either has no profile, or matches DOB filter.
                    OR: [
                        {profile: null}, // TODO Make this field non-optional!
                        {profile: {
                            dateOfBirth: {
                                gte: firstDob,
                                lte: lastDob
                            }
                        }}
                    ]
                }
            },
        },
        select: {
            id: true,
            submissionDate: true,
            status: true,
            grant: {
                select: {
                    title: true
                }
            },
            user: {
                select: {
                    id: true,
                    email: true,
                    profile: {
                        select: {
                            firstName: true,
                            lastName: true,
                            dateOfBirth: true
                        }
                    }
                }
            }
        },
    });

    /* Flatten the resuls for the frontend. */
    const flattened = applications.map((app) => ({
        id: app.id,
        grantTitle: app.grant.title,
        submissionDate: app.submissionDate,
        status: app.status,
        userId: app.user.id,
        userProfileName: getApplicationName(app),
        userProfileEmail: app.user.email,
        userProfileDateOfBirth: app.user?.profile?.dateOfBirth,
    }));
    return flattened
}

function getApplicationName(app: {user: {profile: null | {firstName: string; lastName: string}}}) : string {
    let name = undefined;
    if (app.user.profile?.firstName) {
        name = `${app.user.profile.firstName}`;
    }
    if (app.user.profile?.lastName) {
        name = name != undefined ? `${name} ${app.user.profile.lastName}` : app.user.profile.lastName;
    }
    return name || "Unknown";
}