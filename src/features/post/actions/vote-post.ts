"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath, signInPath, singlePostPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import { postVoteSchema } from "../schemas/post.vote";

export const voteOnPost = actionClient
  .inputSchema(postVoteSchema)
  .action(async ({ parsedInput: { postId, value } }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    const userId = session.user.id;

    try {
      const existingVote = await prisma.vote.findUnique({
        where: { userId_postId: { userId, postId } },
      });

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
        await prisma.vote.create({ data: { userId, postId, value } });
      }

      revalidatePath(postsPath);
      revalidatePath(singlePostPath(postId));
    } catch (error: any) {
      throw new Error("Failed to vote!");
    }
  });
