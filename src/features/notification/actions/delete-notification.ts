"use server";

import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/get-session";
import { notiSchema } from "../schemas/noti";
import { redirect } from "next/navigation";
import { signInPath } from "@/path";

// Delete Single Notification
export const deleteNotification = actionClient
  .inputSchema(notiSchema)
  .action(async ({ parsedInput: { id } }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    try {
      await prisma.notification.delete({
        where: { id },
      });
      revalidatePath("/");
    } catch (error: any) {
      const errorMessage = error?.body?.message || "Something went wrong!";
      throw new Error(errorMessage);
    }
  });

// 4. Delete All Notifications
export const deleteAllNotifications = actionClient.action(async () => {
  const session = await getSession();

  if (!session) {
    redirect(signInPath);
  }

  try {
    await prisma.notification.deleteMany({
      where: { recipientId: session.user.id },
    });
    revalidatePath("/");
  } catch (error: any) {
    const errorMessage = error?.body?.message || "Something went wrong!";
    throw new Error(errorMessage);
  }
});
