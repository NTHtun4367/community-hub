import { Post, User } from "@/generated/prisma/client";

export interface PostWithUser extends Post {
  user: User;
  votes: { value: number; userId: string }[];
  bookmarks: { userId: string }[];
  _count: {
    comments: number;
    votes: number;
  };
}
