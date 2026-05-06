import { prisma } from "@/lib/prisma";
import { PostWithUser } from "../types/post";

export const getPost = async (id: string): Promise<PostWithUser | null> => {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      user: true,
      votes: {
        select: { userId: true, value: true },
      },
      bookmarks: { select: { userId: true } },
      _count: { select: { comments: true, votes: true } },
    },
  });
};
