"use server";

import { actionClient } from "@/lib/safe-action";
import { signInSchema } from "../schemas";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { postsPath } from "@/path";

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
    } catch (error) {
      throw new Error("Something went wrong!");
    }
    redirect(postsPath);
  });
