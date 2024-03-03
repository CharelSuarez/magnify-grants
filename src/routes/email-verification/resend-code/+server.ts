import { sendEmail } from "$lib/server/email";
import { generateEmailVerificationCode } from "$lib/utils/codes";
import { error, type RequestHandler } from "@sveltejs/kit";
<<<<<<< HEAD
<<<<<<< HEAD
import { setFlash } from "sveltekit-flash-message/server";
=======
>>>>>>> 290170af8cce9cf4cb921b218cf071a626506801
=======
>>>>>>> 290170af8cce9cf4cb921b218cf071a626506801

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

<<<<<<< HEAD
<<<<<<< HEAD
    setFlash({
        type: "success",
        richColors: true,
        message: "Sent new code to email",
    }, event);

=======
>>>>>>> 290170af8cce9cf4cb921b218cf071a626506801
=======
>>>>>>> 290170af8cce9cf4cb921b218cf071a626506801
    return new Response("Sent new code");
};