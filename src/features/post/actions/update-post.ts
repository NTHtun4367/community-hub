"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath, signInPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postUpdateSchema } from "../schemas";
import { getSession } from "@/lib/get-session";

export const updatePost = actionClient
  .inputSchema(postUpdateSchema)
  .action(
    async ({ parsedInput: { id, title, description, images, status } }) => {
      const session = await getSession();

      if (!session) {
        redirect(signInPath);
      }

      try {
        await prisma.post.update({
          where: { id, userId: session.user.id },
          data: {
            title,
            description,
            images,
            status,
          },
        });

        revalidatePath(postsPath);
      } catch (error: any) {
        const errorMessage = error?.body?.message || "Something went wrong!";
        throw new Error(errorMessage);
      }
    },
  );
