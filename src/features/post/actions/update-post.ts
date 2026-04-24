"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postUpdateSchema } from "../schemas";

export const updatePost = actionClient
  .inputSchema(postUpdateSchema)
  .action(async ({ parsedInput: { id, title, description } }) => {
    try {
      const data = {
        id,
        title,
        description,
      };

      await prisma.post.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description,
        },
      });

      revalidatePath(postsPath);
    } catch (error) {
      throw new Error("Something went wrong!");
    }

    redirect(postsPath);
  });
