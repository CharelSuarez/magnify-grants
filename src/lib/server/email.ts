import { Resend } from "resend";
import { env } from "$env/dynamic/private";
import { sendMail } from "./dev/nodemailer";

const devEnv = env.NODE_ENV !== "PRODUCTION";

const resend = devEnv ? null : new Resend(env.RESEND_API_KEY);

export const sendEmail = (to: string, subject: string, message: string) => {

    const email = {
        from: "noreply@c01project.local",
        to: to,
        subject: subject,
        html: `<p>${message}<p>`,
    }

    if (devEnv) {
        // Send to local inbucket instead so we don't rate limit resend lol
        sendMail(email);
        return;
    }

    resend?.emails.send(email);
}
