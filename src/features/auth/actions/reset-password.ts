"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { resetPasswordSchema } from "../schemas/auth.reset-password";
import { changePasswordPath } from "@/path";

export const resetPassword = actionClient
  .inputSchema(resetPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    try {
      await auth.api.requestPasswordReset({
        body: {
          email,
          redirectTo: `${process.env.BETTER_AUTH_URL}/${changePasswordPath}`,
        },
      });
    } catch (error: any) {
      const errorMessage = error?.body?.message || "Something went wrong!";
      throw new Error(errorMessage);
    }
  });
