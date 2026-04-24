"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { postCreateSchema } from "../schemas";

export const createPost = actionClient
  .inputSchema(postCreateSchema)
  .action(async ({ parsedInput: { title, description } }) => {
    try {
      await prisma.post.create({
        data: {
          title,
          description,
        },
      });

      revalidatePath(postsPath);
    } catch (error) {
      throw new Error("Something went wrong!");
    }
  });
