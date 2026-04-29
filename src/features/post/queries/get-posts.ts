import { Post, User } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { SearchParams } from "../types/search-params";

export interface PostWithUser extends Post {
  user: User;
  votes: { value: number; userId: string }[];
}

interface PaginatePosts {
  posts: PostWithUser[];
  totalPages: number;
  currentPage: number;
}

export const getPosts = async (
  userId: string | undefined,
  searchParams: SearchParams,
): Promise<PaginatePosts> => {
  const POST_PER_PAGE = 2;
  const currentPage = Number(searchParams.page) || 1;
  const skip = (currentPage - 1) * POST_PER_PAGE;

  const whereCondition = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
  };

  const [totalCounts, posts] = await prisma.$transaction([
    prisma.post.count({ where: whereCondition }),
    prisma.post.findMany({
      where: whereCondition,
      orderBy: { createdAt: searchParams.sort === "asc" ? "asc" : "desc" },
      include: {
        user: true,
        votes: {
          select: { userId: true, value: true },
        },
      },
      skip,
      take: POST_PER_PAGE,
    }),
  ]);

  const totalPages = Math.ceil(totalCounts / POST_PER_PAGE);

  return {
    posts,
    totalPages,
    currentPage,
  };
};
