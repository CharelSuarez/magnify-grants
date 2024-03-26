import type { RequestHandler } from '@sveltejs/kit';
import { formSchema } from '$lib/validation/form_schema';
import { redirect } from 'sveltekit-flash-message/server';

export const POST: RequestHandler = async (event) => {
	// verify user

	let id;
	let message;

	try {
		// validate the payload
		const parsed = formSchema.safeParse(await event.request.json());

		if (!parsed.success) {
			const errors = parsed.error.errors.reduce(
				(acc, error) => {
					if (error.path.length > 1) {
						acc[`${error.path[1]}.${error.path[2]}`] = {
							field: error.path[2],
							message: error.message
						};
					} else {
						acc[error.path[0]] = {
							message: error.message
						};
					}
					return acc;
				},
				{} as { [key: string | number]: {} }
			);
			return new Response(JSON.stringify({ errors: errors }), { status: 400 });
		}

		const body = parsed.data;

		id = body.id;

		const data = {
			name: body.name,
			description: body.description,
			organization: {
				connect: {
					id: 'b972df40-15bf-48c7-a7cf-0c20a0d1669b'
				}
			},
			fields: {}
		};

		let form;

		if (body.id) {
			data['fields'] = {
				deleteMany: {},
				create: body.fields
			};
			form = await db.form.update({
				where: {
					id: id
				},
				data: data,
				include: {
					fields: true,
					organization: true
				}
			});

			message = 'Form updated successfully';
		} else {
			data['fields'] = {
				create: body.fields
			};
			form = await db.form.create({
				data: data,
				include: {
					fields: true,
					organization: true
				}
			});
			message = 'Form created successfully';
		}

		id = form.id;
	} catch (err) {
		console.log(err);
		return new Response(JSON.stringify({ message: 'Server error: could not create form' }), {
			status: 500
		});
	}

	redirect(
		`/grant-admin/grant-builder/${id}/view`,
		{
			type: 'success',
			richColors: true,
			message: message
		},
		event.cookies
	);
};
