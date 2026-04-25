import { Post, User } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export interface PostWithUser extends Post {
  user: User;
}

export const getPosts = async (): Promise<PostWithUser[]> => {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });
};
