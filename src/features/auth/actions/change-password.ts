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
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : "Something went wrong!");
    }
  });
