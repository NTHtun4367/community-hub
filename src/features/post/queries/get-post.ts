import { Post } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const getPost = async (id: string): Promise<Post | null> => {
  return prisma.post.findUnique({ where: { id } });
};
