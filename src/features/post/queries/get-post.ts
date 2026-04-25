import { prisma } from "@/lib/prisma";
import { PostWithUser } from "./get-posts";

export const getPost = async (id: string): Promise<PostWithUser | null> => {
  return prisma.post.findUnique({ where: { id }, include: { user: true } });
};
