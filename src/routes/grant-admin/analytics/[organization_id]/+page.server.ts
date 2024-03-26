import { db } from '$lib/server/db';
import { ApplicationStatus } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const organization = await db.organization.findUnique({
		where: {
			id: params.organization_id
		}
	});


	const numGrants = await db.grant.count({
		where: {
			postedDate: {
				gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
			},
			organizationId: params.organization_id
		}
	});

	const totalFundsAllocated = await db.grant.aggregate({
		_sum: {
			rangeHigh: true
		},
		where: {
			organizationId: params.organization_id
		}
	});

	const totalFundsAllocatedFormatted = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'CAD',
		currencyDisplay: 'narrowSymbol'
	}).format(totalFundsAllocated._sum.rangeHigh);

	// sum the total number of grants in the table
	const totalGrants = await db.grant.count({
		where: {
			organizationId: params.organization_id
		}
	});

	const totalApplications = await db.application.count({
		where: {
			submissionDate: {
				gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
			},
			form: {
				grant: {
					organizationId: params.organization_id
				}
			}
		}
	});

	const inProgressApplications = await db.application.count({
		where: {
			status: ApplicationStatus.IN_PROGRESS,
			form: {
				grant: {
					organizationId: params.organization_id
				}
			}
		}
	});

	const acceptedApplications = await db.application.count({
		where: {
			status: ApplicationStatus.ACCEPTED,
			form: {
				grant: {
					organizationId: params.organization_id
				}
			}
		}
	});

	const acceptanceRate = totalApplications == 0 ? 0 : (acceptedApplications / (totalApplications - inProgressApplications) * 100);

	// sum the amountAwarded field where the form is associated with a grant that has the organizationId organization_id
	const totalFundsAwarded = await db.application.aggregate({
		_sum: {
			amountAwarded: true
		},
		where: {
			form: {
				grant: {
					organizationId: params.organization_id
				}
			}
		}
	});

	const totalFundsAwardedFormatted = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'CAD',
		currencyDisplay: 'narrowSymbol'
	}).format(totalFundsAwarded._sum.amountAwarded);

	const grantsPerSector = await db.grant.groupBy({
		where: {
			organizationId: params.organization_id
		},
		by: ['sector'],
		_count: {
			sector: true
		}
	});

	return {
		organization: organization,
		fundsAllocated: totalFundsAllocatedFormatted,
		totalGrants: totalGrants,
		totalApplications: totalApplications,
		acceptanceRate: acceptanceRate,
		fundsAwarded: totalFundsAwardedFormatted,
		grantsPerSector: grantsPerSector
	};
};
