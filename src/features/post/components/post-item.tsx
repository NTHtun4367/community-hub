import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { editPostPath, singlePostPath } from "@/path";
import { Edit, MessageSquare, Crown, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Post, User } from "@/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import DeleteButton from "./delete-button";
import { getSession } from "@/lib/get-session";
import { isOwner } from "@/lib/is-owner";
import PostImages from "./post-images";
import VoteButtons from "./vote-buttons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import BookmarkButton from "./bookmark-button";
import ShareButton from "./share-button";

interface Props extends Post {
  isCard?: boolean;
  user: User;
  votes: { value: number; userId: string }[];
  bookmarks: { userId: string }[];
  _count: {
    comments: number;
  };
}

async function PostItem({
  id,
  title,
  description,
  images,
  tags,
  status,
  createdAt,
  user,
  votes,
  bookmarks,
  _count,
  isCard = true,
}: Props) {
  const session = await getSession();
  const currentUserId = session?.user.id;
  const score = votes?.reduce((acc, vote) => acc + vote.value, 0) || 0;
  const userVote = currentUserId
    ? votes?.find((v) => v.userId === currentUserId)?.value || null
    : null;

  return (
    <Card className="flex flex-row bg-card transition-colors overflow-hidden mb-4 border-border/50 rounded-2xl shadow-sm">
      {/* Left side: Voting (Vertical) */}
      <div className="w-12 bg-muted/20 flex flex-col items-center py-3 border-r border-border/10">
        <VoteButtons
          postId={id}
          initialScore={score}
          initialUserVote={userVote}
          variant="vertical"
        />
      </div>

      {/* Right side: Content */}
      <div className="flex-1 p-5">
        {/* Header Info: User Profile & Post Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            {/* Avatar with Floating Crown Badge */}
            <div className="relative">
              <Avatar className="w-10 h-10 border-2 border-background shadow-sm">
                <AvatarImage src={user.image ?? undefined} alt={user.name} />
                <AvatarFallback className="text-xs font-bold">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {user.isPremium && (
                <div className="absolute -top-1 -right-1 bg-amber-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-background shadow-sm animate-pulse-subtle">
                  <Crown className="w-3 h-3 text-white fill-current" />
                </div>
              )}
            </div>

            {/* User Info & Time */}
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-foreground leading-none hover:underline cursor-pointer">
                {user.name}
              </span>
              <span className="text-[11px] text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>

          {/* Post Status Badge */}
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] px-2 py-0 h-5 font-bold uppercase tracking-wider",
              status === "DONE"
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-600 border-amber-500/20",
            )}
          >
            {status === "DONE" ? (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Done
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> In Progress
              </span>
            )}
          </Badge>
        </div>

        {/* Post Title */}
        <Link href={singlePostPath(id)}>
          <h3 className="text-xl font-extrabold mb-3 hover:text-primary transition-colors tracking-tight leading-tight">
            {title}
          </h3>
        </Link>

        {/* Media */}
        {images && images.length > 0 && (
          <div className="mb-4 rounded-2xl overflow-hidden border border-border/20">
            <PostImages images={images} />
          </div>
        )}

        {/* Description */}
        <div
          className={cn(
            isCard && "line-clamp-3",
            "text-[15px] leading-relaxed text-muted-foreground mb-4",
          )}
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Tags with Link and Filter Logic */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag) => (
              <Link key={tag} href={`/?tag=${tag}`}>
                <Badge
                  variant="outline"
                  className="text-[11px] font-medium cursor-pointer hover:bg-secondary border-primary/20 text-primary px-2 py-0"
                >
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center gap-1 pt-2 border-t border-border/40 text-muted-foreground">
          <Link href={singlePostPath(id) + "#comments"}>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 h-9 px-3 rounded-xl hover:bg-muted font-bold"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs text-muted-foreground">
                {_count.comments} Comments
              </span>
            </Button>
          </Link>
          <ShareButton postId={id} title={title} />
          <BookmarkButton
            postId={id}
            initialIsBookmarked={bookmarks.some(
              (b) => b.userId === currentUserId,
            )}
          />

          {/* Owner Actions */}
          {(await isOwner(user.id)) && (
            <div className="flex gap-2 ml-auto">
              <Link href={editPostPath(id)}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 rounded-xl"
                >
                  <Edit className="h-4 w-4 text-primary" />
                </Button>
              </Link>
              {!isCard && <DeleteButton id={id} />}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default PostItem;
