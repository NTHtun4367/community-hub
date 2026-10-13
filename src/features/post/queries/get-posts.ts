import { prisma } from "@/lib/prisma";
import { SearchParams } from "../types/search-params";
import { PostWithUser } from "../types/post";
import { Prisma } from "@/generated/prisma/client";

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
  const requestedPage = Number.parseInt(searchParams.page ?? "1", 10);
  const currentPage = Number.isFinite(requestedPage)
    ? Math.max(1, Math.min(requestedPage, 10_000))
    : 1;
  const skip = (currentPage - 1) * POST_PER_PAGE;

  const tab = searchParams.tab ?? "new";

  // Filter logic
  const whereCondition: Prisma.PostWhereInput = {
    ...(userId !== undefined ? { userId } : {}),
    title: {
      contains: (searchParams.search ?? "").slice(0, 100),
      mode: "insensitive",
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
  let orderBy: Prisma.PostOrderByWithRelationInput[] = [
    { createdAt: searchParams.sort === "asc" ? "asc" : "desc" },
    { id: "desc" },
  ];

  if (tab === "top" || tab === "trending") {
    orderBy = [
      { votes: { _count: "desc" } },
      { createdAt: "desc" },
      { id: "desc" },
    ];
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
