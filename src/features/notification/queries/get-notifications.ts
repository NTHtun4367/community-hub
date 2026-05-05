import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/get-session";

export const getNotifications = async () => {
  const session = await getSession();

  if (!session) return [];

  return await prisma.notification.findMany({
    where: {
      recipientId: session.user.id,
    },
    include: {
      issuer: {
        select: {
          name: true,
          image: true,
        },
      },
      post: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 30,
  });
};
