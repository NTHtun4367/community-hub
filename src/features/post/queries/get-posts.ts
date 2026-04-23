import { prisma } from "@/lib/prisma";
import { Post } from "../types/post";

export const getPosts = async (): Promise<Post[]> => {
  return prisma.post.findMany({ orderBy: { createdAt: "desc" } });
};
