import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PostItemSkeleton() {
  return (
    <Card className="flex flex-row bg-card overflow-hidden mb-4 border-border/50 rounded-2xl shadow-sm">
      {/* Left side: Voting (Vertical) Skeleton */}
      <div className="w-12 bg-muted/20 flex flex-col items-center py-3 border-r border-border/10 space-y-4">
        <Skeleton className="h-6 w-6 rounded-md" /> {/* Upvote */}
        <Skeleton className="h-4 w-4 rounded-sm" /> {/* Score */}
        <Skeleton className="h-6 w-6 rounded-md" /> {/* Downvote */}
      </div>

      {/* Right side: Content Skeleton */}
      <div className="flex-1 p-5">
        {/* Header Info Skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            {/* Avatar Skeleton */}
            <Skeleton className="w-10 h-10 rounded-full" />

            <div className="flex flex-col space-y-2">
              {/* User Name */}
              <Skeleton className="h-4 w-24" />
              {/* Time Ago */}
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Status Badge Skeleton */}
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>

        {/* Post Title Skeleton */}
        <div className="mb-3 space-y-2">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-7 w-1/2" />
        </div>

        {/* Media/Image Skeleton */}
        <Skeleton className="h-62.5 w-full rounded-2xl mb-4" />

        {/* Description Skeleton (3 lines) */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[40%]" />
        </div>
      </div>
    </Card>
  );
}

export function PostListSkeleton() {
  return (
    <div className="flex flex-col">
      {[...Array(3)].map((_, i) => (
        <PostItemSkeleton key={i} />
      ))}
    </div>
  );
}
