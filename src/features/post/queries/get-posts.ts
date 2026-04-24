import { Post } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const getPosts = async (): Promise<Post[]> => {
  return prisma.post.findMany({ orderBy: { createdAt: "desc" } });
};
