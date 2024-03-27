import { signupSchema } from '$lib/validation/auth_schema';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { db } from '$lib/server/db';
import { lucia } from '$lib/server/auth';
import { redirect } from 'sveltekit-flash-message/server';
import { generateId } from 'lucia';
import { generateEmailVerificationCode } from '$lib/utils/codes';
import { sendEmail } from '$lib/server/email';
import { setCookie } from '$lib/utils/cookies';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	if (user) {
		if (user.emailVerified) {
			redirect(303, '/');
		}
		redirect(303, '/email-verification');
	}

	return {
		form: await superValidate(zod(signupSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(signupSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { email, password } = form.data;

		const hashedPassword = await new Argon2id().hash(password);
		const userId = generateId(15);

		try {
			await db.user.create({
				data: {
					id: userId,
					email: email,
					hashedPassword: hashedPassword
				}
			});

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			setCookie(sessionCookie, event);
		} catch (err) {
			const errMsg = 'A user with that email already exists';
			setError(form, 'email', errMsg);

			return message(form, {
				type: 'error',
				text: errMsg
			});
		}

		const verificationCode = await generateEmailVerificationCode(userId);

		sendEmail(email, 'Confirm your email', `Your verification code is ${verificationCode}`);

		redirect(
			303,
			'/email-verification',
			{
				type: 'success',
				richColors: true,
				message: 'A confirmation email has been sent to',
				description: form.data.email
			},
			event
		);
	}
};
