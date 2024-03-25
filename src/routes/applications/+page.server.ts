import { filterSchema, type FilterSchema, type Applications } from "$lib/validation/app_schema";
import { redirect, type Actions, fail } from "@sveltejs/kit";
import { redirect as redirectFlash } from "sveltekit-flash-message/server";
import { message, setError, superValidate, 
         type SuperValidated, type Infer } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { lucia } from "$lib/server/auth";
import { ApplicationStatus, type Application } from "@prisma/client";

export const load: PageServerLoad = async (event) => {
    // if (!event.locals.user) {
    //     redirect(303, "/");
    // }

    const filter = await superValidate(zod(filterSchema));
    const applications : Applications = await getApplications(filter);
    return {
        filter,
        applications: applications,
    };
};

export const actions: Actions = {

    default: async (event) => {
        const form = await superValidate(event, zod(filterSchema));
        if (!form.valid) {
            return fail(400, { form });
        }

        console.log(form.data);

        // TODO Authentication...

        const applications : Applications = await getApplications(form);
        return { form, applications };
    },

};

async function getApplications(form: SuperValidated<Infer<FilterSchema>>) : Promise<Applications> {
    const accepted : ApplicationStatus[] = [];
    if (form.data.accepted) accepted.push(ApplicationStatus.ACCEPTED);
    if (form.data.pending) accepted.push(ApplicationStatus.IN_PROGRESS);
    if (form.data.rejected) accepted.push(ApplicationStatus.REJECTED);

    /* If these filters are disabled then there aren't any results! */
    if ((!form.data.incomplete && !form.data.complete) || accepted.length === 0) {
        return {applications: []};
    }

    let minDob = undefined;
    if (form.data.minAge !== undefined) {
        minDob = new Date();
        minDob.setFullYear(minDob.getFullYear() - form.data.minAge);
    }
    let maxDob = undefined;
    if (form.data.maxAge !== undefined) {
        maxDob = new Date();
        maxDob.setFullYear(maxDob.getFullYear() - form.data.maxAge);
    }

    const applications = await db.application.findMany({
        where: {
            // form: form.data.grant, // TODO Add grant filter!
            status: {
                in: accepted,
            },
            complete: (form.data.incomplete && form.data.complete) ? 
                      undefined : (form.data.complete && !form.data.incomplete),
            user: {
                is: {
                    profile: {
                        is: {
                            dateOfBirth: {
                                gte: maxDob,
                                lte: minDob,
                            }
                        }
                    }
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
            version: true,
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
    const flattened : Applications = {
        applications: applications.map((app) => ({
            id: app.id,
            grantTitle: app.form?.name,
            version: app.version,
            complete: app.complete,
            status: app.status,
            userId: app.user.id,
            userProfileName: `${app.user?.profile?.firstName} ${app.user?.profile?.lastName}`,
            userProfileEmail: app.user.email,
            userProfileDateOfBirth: app.user?.profile?.dateOfBirth,
        }))
    }
    console.log(flattened);
    return flattened
}