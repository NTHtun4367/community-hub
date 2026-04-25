"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath, signInPath } from "@/path";
import { revalidatePath } from "next/cache";
import { postCreateSchema } from "../schemas";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";

export const createPost = actionClient
  .inputSchema(postCreateSchema)
  .action(async ({ parsedInput: { title, description } }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    try {
      await prisma.post.create({
        data: {
          title,
          description,
          userId: session.user.id,
        },
      });

      revalidatePath(postsPath);
    } catch (error) {
      throw new Error("Something went wrong!");
    }
  });
