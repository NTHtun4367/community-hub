import { prisma } from "@/lib/prisma";

export const getComments = async (postId: string) => {
  return await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};
