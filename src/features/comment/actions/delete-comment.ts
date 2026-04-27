"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { signInPath, singlePostPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import { commentDeleteSchema } from "../schemas/comment.delete";

export const deleteComment = actionClient
  .inputSchema(commentDeleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    try {
      const comment = await prisma.comment.findUnique({ where: { id } });

      if (!comment) {
        throw new Error("No comment found!");
      }

      await prisma.comment.delete({ where: { id, userId: session.user.id } });

      revalidatePath(singlePostPath(comment.postId));
    } catch (error: any) {
      const errorMessage = error?.body?.message || "Something went wrong!";
      throw new Error(errorMessage);
    }
  });
