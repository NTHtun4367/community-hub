import { getSession } from "@/lib/get-session";
import { prisma } from "@/lib/prisma";
import { signInPath } from "@/path";
import { redirect } from "next/navigation";

export const getSavedPosts = async () => {
  const session = await getSession();

  if (!session) {
    redirect(signInPath);
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
