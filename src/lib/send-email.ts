import ResetPasswordEmailTemplate from "@/features/auth/components/reset-password-email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Options {
  to: string;
  subject: string;
  resetPasswordLink: string;
}

export const sendEmail = async ({
  to,
  subject,
  resetPasswordLink,
}: Options) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "CM-HUB <onboarding@resend.dev>",
      to,
      subject,
      react: ResetPasswordEmailTemplate({ resetPasswordLink }),
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
