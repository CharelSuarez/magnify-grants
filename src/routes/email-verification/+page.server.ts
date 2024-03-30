import { codeSchema } from '$lib/validation/auth_schema';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import { redirect as redirectFlash } from 'sveltekit-flash-message/server';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { verifyVerificationCode } from '$lib/utils/codes';
import { lucia } from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(303, '/');
	}

	if (event.locals.user.emailVerified) {
		redirect(303, '/');
	}

	return {
		form: await superValidate(zod(codeSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		// should not be able to submit this form but just in case these checks

		const user = event.locals.user;

		if (!user) {
			return fail(401);
		}

		if (user.emailVerified) {
			return fail(401);
		}

		const form = await superValidate(event, zod(codeSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const code = form.data.code;

		const valid = await verifyVerificationCode(user.id, code);

		if (!valid) {
			const errMsg = 'Invalid code';
			setError(form, 'code', errMsg);
			return message(form, {
				type: 'error',
				text: errMsg
			});
		}

		await lucia.invalidateUserSessions(user.id); //make sure we invalidate the session

		await db.user.update({
			where: {
				id: user.id
			},
			data: {
				emailVerified: true
			}
		});

		redirectFlash(
			303,
			'/login',
			{
				type: 'success',
				richColors: true,
				message: 'Your email has been confirmed'
			},
			event
		);
	}
};
