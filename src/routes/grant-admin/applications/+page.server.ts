import { filterSchema, type FilterSchema, type Application} from "$lib/validation/app_schema";
import { redirect, type Actions, fail } from "@sveltejs/kit";
import { redirect as redirectFlash } from "sveltekit-flash-message/server";
import { message, setError, superValidate, type Infer } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { lucia } from "$lib/server/auth";
import { ApplicationStatus } from "@prisma/client";

export const load: PageServerLoad = async (event) => {
    // TODO Authentication...
    // if (!event.locals.user) {
    //     redirect(303, "/");
    // }

    const filter = await superValidate(zod(filterSchema));
    const applications : Application[] = await getApplications(filter.data);
    return { filter, applications };
};

export const actions: Actions = {

    default: async (event) => {
        const filter = await superValidate(event, zod(filterSchema));
        if (!filter.valid) {
            return fail(400, { filter });
        }

        // TODO Authentication...

        const applications : Application[] = await getApplications(filter.data);
        return { filter, applications };
    },

};

async function getApplications(form: Infer<FilterSchema>) : Promise<Application[]> {
    const accepted : ApplicationStatus[] = [];
    if (form.accepted) accepted.push(ApplicationStatus.ACCEPTED);
    if (form.pending) accepted.push(ApplicationStatus.IN_PROGRESS);
    if (form.rejected) accepted.push(ApplicationStatus.REJECTED);

    /* If these filters are disabled then there aren't any results! */
    if ((!form.incomplete && !form.complete) || accepted.length === 0) {
        return [];
    }

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

    const applications = await db.application.findMany({
        where: {
            // form: form.data.grant, // TODO Add grant/organization filter!
            status: {
                in: accepted,
            },
            complete: (form.incomplete && form.complete) ? 
                      undefined : (form.complete && !form.incomplete),
            user: {
                is: {
                    // User either has no profile, or matches DOB filter.
                    OR: [
                        {profile: null}, // TODO Make this fields non-optional!
                        {profile: {
                            dateOfBirth: {
                                gte: firstDob,
                                lte: lastDob
                            }
                        }}
                    ]
                }
            }
        },
        select: {
            id: true,
            form: {
                select: {
                    name: true
                }
            },
            updated: true,
            complete: true,
            status: true,
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
        grantTitle: app.form.name,
        updated: app.updated,
        complete: app.complete,
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