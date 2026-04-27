import { Card } from "@/components/ui/card";
import { CommentWithUsername } from "../types/comment-with-username";
import CommentDeleteButton from "./comment-delete-button";

interface CommentItemProps {
  comment: CommentWithUsername;
}

function CommentItem({ comment }: CommentItemProps) {
  return (
    <Card className="text-sm px-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-muted-foreground">{comment.user.name}</p>
        <p className="text-xs text-muted-foreground">
          {comment.createdAt.toLocaleDateString()}
        </p>
      </div>
      <p className="whitespace-pre-line text-base">{comment.content}</p>
      <div className="flex justify-end">
        <CommentDeleteButton id={comment.id} />
      </div>
    </Card>
  );
}

export default CommentItem;
