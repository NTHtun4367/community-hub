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

      // Vote logic...
      if (existingVote) {
        if (existingVote.value === value) {
          await prisma.vote.delete({ where: { id: existingVote.id } });
        } else {
          await prisma.vote.update({
            where: { id: existingVote.id },
            data: { value },
          });
        }
      } else {
        const vote = await prisma.vote.create({
          data: { userId, postId, value },
          include: { post: true },
        });

        // only send noti when upvote
        if (value > 0) {
          await pushNotification({
            recipientId: vote.post.userId,
            issuerId: userId,
            type: "VOTE",
            postId: postId,
            message: `${session.user.name} upvoted your post!`,
          });
        }
      }

      revalidatePath(postsPath);
      revalidatePath(singlePostPath(postId));
    } catch (error: any) {
      throw new Error("Failed to vote!");
    }
  });
