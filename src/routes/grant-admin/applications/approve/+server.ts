import { setFlash } from 'sveltekit-flash-message/server';
import type { RequestHandler } from './$types';
import { AcceptStatus } from '../application-table/app-acceptance-statuses';
import type { ApplicationStatus } from '@prisma/client';

export const POST: RequestHandler = async (event) => {
	try {
		// verify user
		const data = await event.request.json();
		const user = event.locals.getGrantAdmin();

		if (!user) {
			return new Response(JSON.stringify({ message: 'Unauthorized' }), {
				status: 401
			});
		}

		const id = data.id;
		const status: ApplicationStatus = data.status;
		const amount: number = data.amount;

		await db.submission.update({
			where: {
				id
			},
			data: {
				status,
				amountAwarded: amount
			}
		});
	} catch (err) {
		console.log(err);
		return new Response(
			JSON.stringify({ message: `Server error: could not publish grant + ${err}` }),
			{
				status: 500
			}
		);
	}

	setFlash(
		{
			type: 'success',
			richColors: true,
			message: 'Successfully approved application'
		},
		event.cookies
	);

	return new Response(JSON.stringify({ message: 'Grant published successfully' }), {
		status: 200
	});
};
