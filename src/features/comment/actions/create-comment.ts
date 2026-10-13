"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { singlePostPath } from "@/path";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/get-session";
import { commentCreateSchema } from "../schemas/comment.create";
import { pushNotification } from "@/features/notification/actions/push-notification";

export const createComment = actionClient
  .inputSchema(commentCreateSchema)
  .action(async ({ parsedInput: { content, postId, parentId } }) => {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized! You need to sign in!");

    try {
      if (parentId) {
        const parentComment = await prisma.comment.findUnique({
          where: { id: parentId },
          select: { postId: true },
        });
        if (!parentComment || parentComment.postId !== postId) {
          throw new Error("Reply target does not belong to this post.");
        }
      }

      const newComment = await prisma.comment.create({
        data: {
          content,
          postId,
          userId: session.user.id,
          parentId,
        },
        include: { post: true },
      });

      await pushNotification({
        recipientId: newComment.post.userId,
        issuerId: session.user.id,
        type: "COMMENT",
        postId: postId,
        message: `${session.user.name} commented on your post: "${newComment.post.title.substring(0, 20)}..."`,
      });

      revalidatePath(singlePostPath(postId));
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message === "Reply target does not belong to this post."
      ) {
        throw error;
      }
      throw new Error("Failed to post comment");
    }
  });
