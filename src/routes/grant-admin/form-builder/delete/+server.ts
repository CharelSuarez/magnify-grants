import { setFlash } from 'sveltekit-flash-message/server';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	try {
		// verify user
		const data = await event.request.json();

		await db.form.delete({
			where: {
				id: data.id
			}
		});
	} catch (err) {
		console.log(err);
		return new Response(JSON.stringify({ message: 'Server error: could not delete form' }), {
			status: 500
		});
	}

	setFlash(
		{
			type: 'success',
			richColors: true,
			message: 'Form deleted successfully'
		},
		event.cookies
	);

	return new Response(JSON.stringify({ message: 'Form deleted successfully' }), {
		status: 200
	});
};
