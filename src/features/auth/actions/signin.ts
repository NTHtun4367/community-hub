"use server";

import { actionClient } from "@/lib/safe-action";
import { signInSchema } from "../schemas";
import { auth } from "@/lib/auth";

export const signIn = actionClient
  .inputSchema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      await auth.api.signInEmail({
        body: {
          email,
          password,
        },
      });
    } catch (error: any) {
      const errorMessage = error?.body?.message || "Something went wrong!";
      throw new Error(errorMessage);
    }
  });
