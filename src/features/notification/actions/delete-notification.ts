"use server";

import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/get-session";
import { notiSchema } from "../schemas/noti";
import { notificationPath } from "@/path";

// Delete Single Notification
export const deleteNotification = actionClient
  .inputSchema(notiSchema)
  .action(async ({ parsedInput: { id } }) => {
    const session = await getSession();

    if (!session) {
      throw new Error("Unauthorized! You need to sign in!");
    }

    try {
      await prisma.notification.deleteMany({
        where: { id, recipientId: session.user.id },
      });
      revalidatePath(notificationPath);
      revalidatePath("/");
    } catch {
      throw new Error("Unable to delete this notification.");
    }
  });

// 4. Delete All Notifications
export const deleteAllNotifications = actionClient.action(async () => {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized! You need to sign in!");
  }

  try {
    await prisma.notification.deleteMany({
      where: { recipientId: session.user.id },
    });
    revalidatePath(notificationPath);
    revalidatePath("/");
  } catch {
    throw new Error("Unable to clear notifications.");
  }
});
