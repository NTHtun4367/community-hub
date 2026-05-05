"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { getSession } from "@/lib/get-session";
import { revalidatePath } from "next/cache";
import { notiSchema } from "../schemas/noti";
import { redirect } from "next/navigation";
import { signInPath } from "@/path";

export const pushNotification = async ({
  recipientId,
  issuerId,
  type,
  postId,
  message,
}: {
  recipientId: string;
  issuerId: string;
  type: "VOTE" | "COMMENT";
  postId: string;
  message: string;
}) => {
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
      redirect(signInPath);
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
    redirect(signInPath);
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
