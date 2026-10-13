"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath, singlePostPath } from "@/path";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/get-session";
import { postVoteSchema } from "../schemas/post.vote";
import { pushNotification } from "../../notification/actions/push-notification";

export const voteOnPost = actionClient
  .inputSchema(postVoteSchema)
  .action(async ({ parsedInput: { postId, value } }) => {
    const session = await getSession();
    if (!session) throw new Error("You need to sign in!");

    const userId = session.user.id;

    try {
      const existingVote = await prisma.vote.findUnique({
        where: { userId_postId: { userId, postId } },
      });

      if (!existingVote) {
        const post = await prisma.post.findUnique({
          where: { id: postId },
          select: { userId: true },
        });
        if (!post) throw new Error("Post not found.");
        await prisma.vote.create({
          data: { userId, postId, value },
        });
        if (value > 0) {
          await pushNotification({
            recipientId: post.userId,
            issuerId: userId,
            type: "VOTE",
            postId,
            message: `${session.user.name} upvoted your post!`,
          });
        }
      } else if (existingVote.value === value) {
        await prisma.vote.delete({ where: { id: existingVote.id } });
      } else {
        await prisma.vote.update({
          where: { id: existingVote.id },
          data: { value },
        });
      }

      revalidatePath(postsPath);
      revalidatePath(singlePostPath(postId));
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : "Failed to vote!");
    }
  });
