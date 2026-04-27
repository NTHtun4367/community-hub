"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { signInPath, singlePostPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import { commentCreateSchema } from "../schemas/comment.create";

export const createComment = actionClient
  .inputSchema(commentCreateSchema)
  .action(async ({ parsedInput: { content, postId } }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    try {
      await prisma.comment.create({
        data: {
          content,
          postId,
          userId: session.user.id,
        },
      });

      revalidatePath(singlePostPath(postId));
    } catch (error: any) {
      const errorMessage = error?.body?.message || "Something went wrong!";
      throw new Error(errorMessage);
    }
  });
