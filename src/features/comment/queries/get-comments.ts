import { prisma } from "@/lib/prisma";

export const getComments = async (postId: string) => {
  return await prisma.comment.findMany({
    where: {
      postId,
      parentId: null,
    },
    include: {
      user: { select: { name: true, image: true } },
      replies: {
        include: {
          user: { select: { name: true, image: true } },
          replies: {
            include: {
              user: { select: { name: true, image: true } },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};
