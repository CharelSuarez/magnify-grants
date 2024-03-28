import { setFlash } from 'sveltekit-flash-message/server';
import type { RequestHandler } from './$types';

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

		await db.grant.update({
			where: {
				id: data.id
			},
			data: {
				published: false
			}
		});
	} catch (err) {
		console.log(err);
		return new Response(JSON.stringify({ message: `Server error: could not unpublish grant + ${err}` }), {
			status: 500
		});
	}

	setFlash(
		{
			type: 'success',
			richColors: true,
			message: 'Grant unpublished successfully'
		},
		event.cookies
	);

	return new Response(JSON.stringify({ message: 'Grant unpublished successfully' }), {
		status: 200
	});
};