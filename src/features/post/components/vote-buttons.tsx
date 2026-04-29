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
}

function VoteButtons({
  postId,
  initialScore,
  initialUserVote,
}: VoteButtonsProps) {
  const [score, setScore] = useState(initialScore);
  const [userVote, setUserVote] = useState(initialUserVote);

  const { execute, isPending } = useAction(voteOnPost, {
    onError: ({ error }) => {
      setScore(score);
      setUserVote(userVote);
      const message = error.serverError || "Something went wrong!";
      toast.error(message);
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
    <div className="flex items-center gap-1">
      <Button
        className={cn(
          "w-8 h-8 transition-transform active:scale-90",
          userVote === 1
            ? "text-orange-500 hover:text-orange-600"
            : "text-muted-foreground hover:text-foreground",
        )}
        variant={"ghost"}
        size={"icon"}
        disabled={isPending}
        onClick={() => handleVote(1)}
      >
        <ArrowBigUp
          className={cn("w-6 h-6", userVote === 1 && "fill-current")}
        />
      </Button>
      <span className="text-sm font-bold text-center transition-all duration-300 animate-pulse">
        {formatNumber(score)}
      </span>
      <Button
        className={cn(
          "w-8 h-8 transition-transform active:scale-90",
          userVote === -1
            ? "text-blue-500 hover:text-blue-600"
            : "text-muted-foreground hover:text-foreground",
        )}
        variant={"ghost"}
        size={"icon"}
        disabled={isPending}
        onClick={() => handleVote(-1)}
      >
        <ArrowBigDown
          className={cn("w-6 h-6", userVote === -1 && "fill-current")}
        />
      </Button>
    </div>
  );
}

export default VoteButtons;
