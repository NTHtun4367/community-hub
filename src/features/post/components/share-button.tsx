"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareButtonProps {
  postId: string;
  title: string;
}

function ShareButton({ postId, title }: ShareButtonProps) {
  const handleShare = async () => {
    const url = `${window.location.origin}/post/${postId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (error) {
        // AbortError skip
        if (error instanceof Error && error.name !== "AbortError") {
          toast.error("Could not share the post");
          console.error("Sharing failed", error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      } catch (err) {
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleShare}
      className="gap-2 h-9 px-3 rounded-xl hover:bg-muted font-bold transition-colors"
    >
      <Share2 className="h-4 w-4 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">Share</span>
    </Button>
  );
}

export default ShareButton;
