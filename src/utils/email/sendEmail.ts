
import nodemailer from "nodemailer"
import { env } from "../../config/.env.config.js"
import { en } from "zod/locales"
import { ApiError } from "../apiError.js"


interface SendEmailOptions{
    to: string,
    subject: string,
    html: string,
    text?: string
}
const transporter = nodemailer.createTransport({
    host: env.smtp_host,
    port: Number(env.smtp_port),
    secure: Number(env.smtp_port) == 465,
    auth: {
        user: env.smtp_user,
        pass: env.smtp_pass
    }
})
export const sendEmail = async({
to, 
subject,
html,
text,
}: SendEmailOptions): Promise<void> => {
   try {
    await transporter.sendMail({
      from: env.smtp_from,
      to,
      subject,
      text: text || html.replace(/<[^>]+>/g, ""), // Fallback plain-text version
      html,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new ApiError(500, "Failed to send email");
  }
}