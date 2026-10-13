"use server";

import { actionClient } from "@/lib/safe-action";
import { signUpSchema } from "../schemas";
import { auth } from "@/lib/auth";

export const signUp = actionClient
  .inputSchema(signUpSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    try {
      await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
      });
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : "Something went wrong!");
    }
  });
