import { Prisma } from "@/generated/prisma/client";

export type CommentWithUsername = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: { name: true };
    };
  };
}>;
