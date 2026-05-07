"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { getSession } from "@/lib/get-session";
import { revalidatePath } from "next/cache";
import { notiSchema } from "../schemas/noti";

interface Props {
  recipientId: string;
  issuerId: string;
  type: "VOTE" | "COMMENT";
  postId: string;
  message: string;
}

export const pushNotification = async ({
  recipientId,
  issuerId,
  type,
  postId,
  message,
}: Props) => {
  // if owner
  if (recipientId === issuerId) return;

  try {
    await prisma.notification.create({
      data: {
        recipientId,
        issuerId,
        type,
        postId,
        message,
      },
    });
  } catch (error: any) {
    const errorMessage = error?.body?.message || "Something went wrong!";
    throw new Error(errorMessage);
  }
};

// 1. Mark Single as Read
export const markAsRead = actionClient
  .inputSchema(notiSchema)
  .action(async ({ parsedInput: { id } }) => {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized! You need to sign in!");
    }

    try {
      await prisma.notification.update({
        where: { id },
        data: { isRead: true },
      });
      revalidatePath("/");
    } catch (error: any) {
      const errorMessage = error?.body?.message || "Something went wrong!";
      throw new Error(errorMessage);
    }
  });

// 2. Mark All as Read
export const markAllAsRead = actionClient.action(async () => {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized! You need to sign in!");
  }

  try {
    await prisma.notification.updateMany({
      where: { recipientId: session.user.id, isRead: false },
      data: { isRead: true },
    });
    revalidatePath("/");
  } catch (error: any) {
    const errorMessage = error?.body?.message || "Something went wrong!";
    throw new Error(errorMessage);
  }
});
