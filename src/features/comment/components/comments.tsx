import { getComments } from "../queries/get-comments";
import CommentItem from "./comment-item";
import CreateCommentForm from "./create-comment-form";

interface CommentsProps {
  postId: string;
}

async function Comments({ postId }: CommentsProps) {
  const comments = await getComments(postId);

  return (
    <div className="mt-4 space-y-4">
      <CreateCommentForm />
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
    </div>
  );
}

export default Comments;
