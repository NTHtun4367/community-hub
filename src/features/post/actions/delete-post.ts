"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath, signInPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postDeleteSchema } from "../schemas";
import { getSession } from "@/lib/get-session";

export const deletePost = actionClient
  .inputSchema(postDeleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    try {
      await prisma.post.delete({ where: { id, userId: session.user.id } });

      revalidatePath(postsPath);
    } catch (error) {
      throw new Error("Something went wrong!");
    }
    redirect(postsPath);
  });
