"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { changePasswordSchema } from "../schemas/auth.change-password";
import { redirect } from "next/navigation";
import { signInPath } from "@/path";

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
    } catch (error) {
      throw new Error("Something went wrong!");
    }

    redirect(signInPath);
  });
