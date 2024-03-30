import { db } from '$lib/server/db';
import { redirect as redirectFlash } from 'sveltekit-flash-message/server';
import { fromShort } from '$lib/utils/url';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getRequiredDocumentURL, listGrantDocuments } from '$lib/utils/downloads';

export const load: PageServerLoad = async (event) => {
	const grantAdmin = await event.locals.getGrantAdmin();

	if (!grantAdmin) {
		redirect(401, '/');
	}

	const id = fromShort(event.params.submissionId);

	try {
		const submission = await db.submission.findFirst({
			where: {
				id: id,
				applications: {
					some: {
						form: {
							organizationId: grantAdmin.organizationId
						}
					}
				}
			},
			include: {
				applications: {
					include: {
						form: true
					}
				},
				grant: {
					include: {
						requiredDocuments: true
					}
				}
			}
		});

		if (!submission) {
			return redirect(400, '/grant-admin/applications');
		}

		const requiredDocuments = submission.grant.requiredDocuments;

		const documents: { prompt: string; name: string; url: string }[] = [];

		if (requiredDocuments.length > 0) {
			for (const doc of requiredDocuments) {
				const { urlObject, fileName } = await getRequiredDocumentURL(
					submission.userId,
					doc.id,
					event.locals.supabase
				);

				if (!urlObject || !urlObject.data) {
					continue;
				}

				documents.push({
					prompt: doc.prompt,
					name: fileName,
					url: urlObject.data.signedUrl
				});
			}
		}

		const profile = await db.profile.findFirst({
			where: {
				userId: submission.userId
			}
		});

		return {
			userProfile: profile,
			submission,
			documents
		};
	} catch (err) {
		redirectFlash(
			500,
			'/grant-admin/applications/',
			{
				richColors: true,
				type: 'error',
				message: 'Server error occurred'
			},
			event
		);
	}
};
