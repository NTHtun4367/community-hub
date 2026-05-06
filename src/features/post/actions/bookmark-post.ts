"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { getSession } from "@/lib/get-session";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { postsPath, singlePostPath } from "@/path";

const bookmarkSchema = z.object({ postId: z.string() });

export const toggleBookmark = actionClient
  .inputSchema(bookmarkSchema)
  .action(async ({ parsedInput: { postId } }) => {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized! You need to sign in!");
    }

    const userId = session.user.id;

    try {
      const existing = await prisma.bookmark.findUnique({
        where: { userId_postId: { userId, postId } },
      });

      if (existing) {
        // DELETE (Unsave)
        await prisma.bookmark.delete({ where: { id: existing.id } });
        revalidatePath("/");
        revalidatePath(postsPath);
        revalidatePath(singlePostPath(postId));
        return { isBookmarked: false };
      }

      // CREATE (Save)
      await prisma.bookmark.create({ data: { userId, postId } });
      revalidatePath("/");
      revalidatePath(postsPath);
      revalidatePath(singlePostPath(postId));
      return { isBookmarked: true };
    } catch (error) {
      throw new Error("Failed to bookmark!");
    }
  });
