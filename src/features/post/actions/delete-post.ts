"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postDeleteSchema } from "../schemas";

export const deletePost = actionClient
  .inputSchema(postDeleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await prisma.post.delete({ where: { id } });

      revalidatePath(postsPath);
    } catch (error) {
      throw new Error("Something went wrong!");
    }
    redirect(postsPath);
  });
