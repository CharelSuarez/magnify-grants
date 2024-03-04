import { sendEmail } from "$lib/server/email";
import { generateEmailVerificationCode } from "$lib/utils/codes";
import { error, type RequestHandler } from "@sveltejs/kit";
import { setFlash } from "sveltekit-flash-message/server";

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

    setFlash({
        type: "success",
        richColors: true,
        message: "Sent new code to email",
    }, event);

    return new Response("Sent new code");
};