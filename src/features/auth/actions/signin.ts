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
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : "Something went wrong!");
    }
  });
