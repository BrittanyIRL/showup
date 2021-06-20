import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

function prettyEmail(text: string):string {
    return `
    <div>
        <h1>Here's your email</h1>
        <p>${text}</p>
    </div>
    
    `;
}

export interface Envelope {
    from: string;
    to?: (string)[] | null;
}

export interface MailResponse {
  accepted?: (string)[] | null;
  rejected?: (null)[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export async function sendPasswordResetEmail(resetToken: string, to: string): Promise<void> {
    const info = (await transporter.sendMail({
        to,
        from: 'brittany.feenstra@gmail.com',
        subject: 'password reset',
        html: prettyEmail(`have a toke <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Go here</a>`)
    })) as MailResponse;
}