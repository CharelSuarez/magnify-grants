import { db } from '$lib/server/db';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { fromShort } from '$lib/utils/url';
import { ApplicationStatus } from '@prisma/client';

export const load: PageServerLoad = async (event) => {
	try {
		const id = fromShort(event.params.grantId);

		const grant = await db.grant.findFirst({
			where: {
				id: id
			},
			include: {
				organization: {
					select: {
						id: true,
						name: true
					}
				}
			}
		});

		if (!grant) {
			redirect(
				307,
				`/grant-admin/grants`,
				{
					richColors: true,
					type: 'error',
					message: 'Grant not found!'
				},
				event
			);
		}

		const totalAmountAwarded = await db.submission.aggregate({
			where: {
				status: ApplicationStatus.ACCEPTED,
				grant: {
					id: grant.id
				}
			},
			_sum: {
				amountAwarded: true
			}
		});

		const applications = await db.submission.findMany({
			where: {
				grant: {
					id: grant.id
				}
			}
		});

		let numberOfApplications = applications.length;
		let avgAmountAwarded = 0;
		let acceptanceRate = 0;
		if (totalAmountAwarded && totalAmountAwarded._sum.amountAwarded) {
			numberOfApplications = applications.length;
			const inProgressApplications = applications.filter(
				(a) => a.status == ApplicationStatus.IN_PROGRESS
			).length;
			const acceptedApplications = applications.filter(
				(a) => a.status == ApplicationStatus.ACCEPTED
			).length;
			avgAmountAwarded = totalAmountAwarded._sum.amountAwarded / acceptedApplications;
			acceptanceRate =
				(acceptedApplications / (numberOfApplications - inProgressApplications)) * 100;
		}

		return {
			grant,
			amountAwarded: totalAmountAwarded._sum.amountAwarded,
			numApplicants: numberOfApplications,
			acceptanceRate: acceptanceRate ? acceptanceRate : 0,
			avgAmountAwarded: avgAmountAwarded
		};
	} catch (err) {
		console.log(err);
		redirect(
			307,
			'/grant-admin/grants',
			{
				richColors: true,
				type: 'error',
				message: 'Server error occurred'
			},
			event
		);
	}
};
