"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquareReply, ChevronDown, ChevronUp } from "lucide-react";
import { CommentWithUsername } from "../types/comment-with-username";
import CommentDeleteButton from "./comment-delete-button";
import CreateCommentForm from "./create-comment-form";
import { formatDistanceToNow } from "date-fns";

interface CommentItemProps {
  comment: CommentWithUsername;
}

function CommentItem({ comment }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className="group flex flex-col space-y-3 pt-4">
      <div className="flex gap-3">
        {/* Left Side: Avatar & Thread Line */}
        <div className="flex flex-col items-center">
          <Avatar className="w-8 h-8">
            <AvatarImage src={comment.user.image ?? undefined} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {comment.user.name?.[0].toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          {/* Thread line for active replies */}
          {hasReplies && showReplies && (
            <div className="w-px h-full bg-border mt-2" />
          )}
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{comment.user.name}</span>
            <span className="text-[11px] text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt))} ago
            </span>
          </div>

          <p className="text-sm leading-relaxed text-foreground/90 py-1">
            {comment.content}
          </p>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageSquareReply className="w-3.5 h-3.5 mr-1" />
              Reply
            </button>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <CommentDeleteButton id={comment.id} />
            </div>

            {hasReplies && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center text-xs font-medium text-primary hover:underline ml-auto"
              >
                {showReplies ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 mr-1" /> Hide Replies
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 mr-1" /> Show{" "}
                    {comment.replies.length}{" "}
                    {comment.replies.length > 1 ? "Replies" : "Reply"}
                  </>
                )}
              </button>
            )}
          </div>

          {/* Reply Form Area */}
          {isReplying && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <CreateCommentForm
                parentId={comment.id}
                onSuccess={() => {
                  setIsReplying(false);
                  setShowReplies(true);
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(false)}
                className="mt-2 text-xs h-7 text-muted-foreground"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies Rendering - Recursive Call */}
      {hasReplies && showReplies && (
        <div className="ml-4 pl-6 border-l border-border space-y-2 animate-in fade-in duration-300">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
