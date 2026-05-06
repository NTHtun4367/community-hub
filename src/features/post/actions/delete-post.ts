"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { postDeleteSchema } from "../schemas";
import { getSession } from "@/lib/get-session";

export const deletePost = actionClient
  .inputSchema(postDeleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized! You need to sign in!");
    }

    try {
      await prisma.post.delete({ where: { id, userId: session.user.id } });

      revalidatePath(postsPath);
    } catch (error: any) {
      const errorMessage = error?.body?.message || "Something went wrong!";
      throw new Error(errorMessage);
    }
  });
