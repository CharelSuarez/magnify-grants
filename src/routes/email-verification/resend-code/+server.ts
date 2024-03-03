import { sendEmail } from "$lib/server/email";
import { generateEmailVerificationCode } from "$lib/utils/codes";
import { error, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async (event) => {

    const user = event.locals.user;

    if (!user) {
        error(401, "No session");
    }

    if (user.emailVerified) {
        error(401, "Already verified");
    }

    const verificationCode = await generateEmailVerificationCode(user.id);
    sendEmail(user.email, "Confirm your email", `Your verification code is ${verificationCode}`);

    return new Response("Sent new code");
};