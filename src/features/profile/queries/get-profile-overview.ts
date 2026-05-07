"use server";

import { getSession } from "@/lib/get-session";
import { prisma } from "@/lib/prisma";

interface ProfileOverview {
  isPremium: boolean;
  postCount: number;
  commentCount: number;
  premiumExpiresAt: Date | null;
  premiumAmount: number | null;
  premiumCurrency: string | null;
  premiumLastPaymentAt: Date | null;
}

export const getProfileOverview = async (): Promise<ProfileOverview> => {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized! You need to sign in!");
  }

  const userId = session.user.id;

  const [user, postCount, commentCount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        isPremium: true,
        premiumExpiresAt: true,
        premiumAmount: true,
        premiumCurrency: true,
        premiumLastPaymentAt: true,
      },
    }),
    prisma.post.count({ where: { userId } }),
    prisma.comment.count({ where: { userId } }),
  ]);

  return {
    isPremium: user?.isPremium ?? false,
    postCount,
    commentCount,
    premiumExpiresAt: user?.premiumExpiresAt ?? null,
    premiumAmount: user?.premiumAmount ?? null,
    premiumCurrency: user?.premiumCurrency ?? null,
    premiumLastPaymentAt: user?.premiumLastPaymentAt ?? null,
  };
};
