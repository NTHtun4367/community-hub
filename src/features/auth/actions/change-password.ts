"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { changePasswordSchema } from "../schemas/auth.change-password";

export const changePassword = actionClient
  .inputSchema(changePasswordSchema)
  .action(async ({ parsedInput: { newPassword, token } }) => {
    try {
      await auth.api.resetPassword({
        body: {
          newPassword,
          token,
        },
      });
    } catch (error: any) {
      const errorMessage = error?.body?.message || "Something went wrong!";
      throw new Error(errorMessage);
    }
  });
