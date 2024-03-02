import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const sendEmail = (to: string, subject: string, message: string) => {
    resend.emails.send({
        from: "c01project@resend.dev",
        to: to,
        subject: subject,
        html: `<p>${message}<p>`
    });
}
