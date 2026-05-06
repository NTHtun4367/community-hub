"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { singlePostPath } from "@/path";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/get-session";
import { commentDeleteSchema } from "../schemas/comment.delete";

export const deleteComment = actionClient
  .inputSchema(commentDeleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized! You need to sign in!");

    try {
      const comment = await prisma.comment.findUnique({
        where: { id },
        select: { userId: true, postId: true },
      });

      if (!comment) throw new Error("Comment not found.");
      if (comment.userId !== session.user.id)
        throw new Error("Unauthorized delete attempt.");

      await prisma.comment.delete({
        where: { id },
      });

      revalidatePath(singlePostPath(comment.postId));
      return { success: true };
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete comment.");
    }
  });
