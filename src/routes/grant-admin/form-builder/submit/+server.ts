import type { RequestHandler } from '@sveltejs/kit';
import { formSchema } from '$lib/validation/form_schema';
import { redirect } from 'sveltekit-flash-message/server';
import { toShort } from '$lib/utils/url';

export const POST: RequestHandler = async (event) => {
  
	let id;
	let message;

	try {

		const grantAdmin = await event.locals.getGrantAdmin();

		if (!grantAdmin) {
			return new Response('Server error', { status: 500 });
		}

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
					id: grantAdmin.organizationId
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
				data: data
			});

			message = 'Form updated successfully';
		} else {
			data['fields'] = {
				create: body.fields
			};
			form = await db.form.create({
				data: data
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
		`/grant-admin/form-builder/${toShort(id)}/view`,
		{
			type: 'success',
			richColors: true,
			message: message
		},
		event.cookies
	);
};
