import { setFlash } from 'sveltekit-flash-message/server';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	console.log('in req');
	try {
		// verify user
		const data = await event.request.json();
		const user = event.locals.getGrantAdmin();

		if (!user) {
			return new Response(JSON.stringify({ message: 'Unauthorized' }), {
				status: 401
			});
		}

		await db.grant.delete({
			where: {
				id: data.id
			}
		});
	} catch (err) {
		console.log(err);
		return new Response(
			JSON.stringify({ message: `Server error: could not delete grant + ${err}` }),
			{
				status: 500
			}
		);
	}

	setFlash(
		{
			type: 'success',
			richColors: true,
			message: 'Grant deleted successfully'
		},
		event.cookies
	);

	return new Response(JSON.stringify({ message: 'Grant deleted successfully' }), {
		status: 200
	});
};
