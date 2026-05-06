"use client";

import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { voteOnPost } from "../actions/vote-post";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

interface VoteButtonsProps {
  postId: string;
  initialScore: number;
  initialUserVote: number | null;
  variant?: "horizontal" | "vertical";
}

function VoteButtons({
  postId,
  initialScore,
  initialUserVote,
  variant = "horizontal",
}: VoteButtonsProps) {
  const [score, setScore] = useState(initialScore);
  const [userVote, setUserVote] = useState(initialUserVote);

  const { execute, isPending } = useAction(voteOnPost, {
    onError: ({ error }) => {
      setScore(initialScore);
      setUserVote(initialUserVote);
      toast.error(error.serverError || "Something went wrong!");
    },
  });

  const handleVote = (value: number) => {
    const newVote = userVote === value ? null : value;
    const prevVoteValue = userVote || 0;
    const newVoteValue = newVote || 0;
    const scoreDiff = newVoteValue - prevVoteValue;

    setScore(score + scoreDiff);
    setUserVote(newVote);
    execute({ postId, value });
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        variant === "vertical" ? "flex-col" : "flex-row",
      )}
    >
      <Button
        className={cn(
          "w-8 h-8 transition-all active:scale-125",
          userVote === 1
            ? "text-primary hover:bg-indigo-100"
            : "text-muted-foreground hover:text-primary/90 hover:bg-indigo-50",
        )}
        variant="ghost"
        size="icon"
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault();
          handleVote(1);
        }}
      >
        <ArrowBigUp
          className={cn("h-6 w-6", userVote === 1 && "fill-current")}
        />
      </Button>

      <span
        className={cn(
          "text-xs font-black",
          userVote === 1 && "text-primary",
          userVote === -1 && "text-orange-600",
        )}
      >
        {formatNumber(score)}
      </span>

      <Button
        className={cn(
          "w-8 h-8 transition-all active:scale-125",
          userVote === -1
            ? "text-orange-600 hover:bg-orange-100"
            : "text-muted-foreground hover:text-orange-500 hover:bg-orange-50",
        )}
        variant="ghost"
        size="icon"
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault();
          handleVote(-1);
        }}
      >
        <ArrowBigDown
          className={cn("h-6 w-6", userVote === -1 && "fill-current")}
        />
      </Button>
    </div>
  );
}

export default VoteButtons;
