"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { toggleBookmark } from "../actions/bookmark-post";

interface Props {
  postId: string;
  initialIsBookmarked: boolean;
}

function BookmarkButton({ postId, initialIsBookmarked }: Props) {
  const { execute, result, isPending } = useAction(toggleBookmark, {
    onSuccess: ({ data }) => {
      toast.success(
        data?.isBookmarked ? "Saved to bookmarks" : "Removed from bookmarks",
      );
    },
  });

  const isBookmarked = result.data?.isBookmarked ?? initialIsBookmarked;

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isPending}
      onClick={() => execute({ postId })}
      className={cn(
        "gap-2 h-9 px-3 rounded-xl hover:bg-muted font-bold",
        isBookmarked && "text-primary",
      )}
    >
      <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
      <span className="text-xs text-muted-foreground">
        {isBookmarked ? "Saved" : "Save"}
      </span>
    </Button>
  );
}

export default BookmarkButton;
