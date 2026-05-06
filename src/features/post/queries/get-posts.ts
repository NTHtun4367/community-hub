import { prisma } from "@/lib/prisma";
import { SearchParams } from "../types/search-params";
import { PostWithUser } from "../types/post";

interface PaginatePosts {
  posts: PostWithUser[];
  totalPages: number;
  currentPage: number;
}

export const getPosts = async (
  userId: string | undefined,
  searchParams: SearchParams,
): Promise<PaginatePosts> => {
  const POST_PER_PAGE = 10;
  const currentPage = Number(searchParams.page) || 1;
  const skip = (currentPage - 1) * POST_PER_PAGE;

  const tab = searchParams.tab || "new";

  // Filter logic
  const whereCondition: any = {
    userId,
    title: {
      contains: searchParams.search || "",
      mode: "insensitive" as const,
    },
    ...(searchParams.tag && {
      tags: { has: searchParams.tag },
    }),
  };

  // if trending, show last 24h posts
  if (tab === "trending") {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    whereCondition.createdAt = { gte: oneDayAgo };
  }

  // Sorting logic
  let orderBy: any = {
    createdAt: searchParams.sort === "asc" ? "asc" : "desc",
  };

  if (tab === "top" || tab === "trending") {
    orderBy = { votes: { _count: "desc" } };
  }

  const [totalCounts, posts] = await Promise.all([
    prisma.post.count({ where: whereCondition }),
    prisma.post.findMany({
      where: whereCondition,
      orderBy: orderBy,
      include: {
        user: true,
        votes: { select: { userId: true, value: true } },
        bookmarks: { select: { userId: true } },
        _count: { select: { comments: true, votes: true } },
      },
      skip,
      take: POST_PER_PAGE,
    }),
  ]);

  const totalPages = Math.ceil(totalCounts / POST_PER_PAGE);

  return {
    posts: posts as PostWithUser[],
    totalPages,
    currentPage,
  };
};
