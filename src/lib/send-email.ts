import ResetPasswordEmailTemplate from "@/features/auth/components/reset-password-email-template";
import { Resend } from "resend";

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is required to send email.");
  return new Resend(apiKey);
};

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
    const { error } = await getResend().emails.send({
      from: process.env.EMAIL_FROM ?? "Dev Forum <onboarding@resend.dev>",
      to,
      subject,
      react: ResetPasswordEmailTemplate({ resetPasswordLink }),
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Failed to send email.");
  }
};
