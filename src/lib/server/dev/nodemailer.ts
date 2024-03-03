import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 2500,
    ignoreTLS: true,
    secure: false,
    tls: {
        rejectUnauthorized: false,
    },
});

export const sendMail = (email: {from: string, to: string, subject: string, html: string}) => {
    transporter.sendMail(email, (error) => {
        if (error) {
            console.log(error);
        }
        console.log(`Message sent to inbucket`);
    });
}