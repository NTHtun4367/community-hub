export type CommentWithUsername = {
  id: string;
  content: string;
  createdAt: Date;
  postId: string;
  parentId: string | null;
  userId: string;
  user: {
    name: string | null;
    image: string | null;
  };
  replies: CommentWithUsername[];
};
