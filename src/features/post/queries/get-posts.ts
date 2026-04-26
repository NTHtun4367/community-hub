import { Post, User } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export interface PostWithUser extends Post {
  user: User;
}

export const getPosts = async (
  userId: string | undefined,
): Promise<PostWithUser[]> => {
  return prisma.post.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
};
