import { getSession } from "@/lib/get-session";
import { prisma } from "@/lib/prisma";

export const getSavedPosts = async () => {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized! You need to sign in!");
  }

  return await prisma.post.findMany({
    where: {
      bookmarks: { some: { userId: session.user.id } },
    },
    include: {
      user: true,
      votes: { select: { userId: true, value: true } },
      bookmarks: { select: { userId: true } },
      _count: { select: { comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};
