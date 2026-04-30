import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { editPostPath, singlePostPath } from "@/path";
import { Edit, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { Post, User } from "@/generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import DeleteButton from "./delete-button";
import { getSession } from "@/lib/get-session";
import { isOwner } from "@/lib/is-owner";
import PostImages from "./post-images";
import VoteButtons from "./vote-buttons";

interface Props extends Post {
  isCard?: boolean;
  user: User;
  votes: { value: number; userId: string }[];
}

async function PostItem({
  id,
  title,
  description,
  images,
  tags,
  status,
  user,
  votes,
  isCard = true,
}: Props) {
  const session = await getSession();
  const currentUserId = session?.user.id;

  const score = votes?.reduce((acc, vote) => acc + vote.value, 0);

  const userVote = currentUserId
    ? votes?.find((v) => v.userId === currentUserId)?.value || null
    : null;

  return (
    <Card className="relative">
      <Badge
        className="absolute right-4 top-4 z-10"
        variant={status === "IN_PROGRESS" ? "outline" : "default"}
      >
        {status}
      </Badge>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription
          className={cn(
            isCard && "line-clamp-2",
            "prose dark:prose-invert max-w-none",
          )}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <PostImages images={images} />
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 my-1">
            {tags.map((tag) => (
              <Link key={tag} href={`/?tag=${tag}`}>
                <Badge
                  variant={"outline"}
                  className="cursor-pointer hover:bg-secondary"
                >
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
        <p className="text-sm text-muted-foreground font-medium">
          @{user.name}
        </p>
        <div>
          <VoteButtons
            postId={id}
            initialScore={score}
            initialUserVote={userVote}
          />
        </div>
      </CardHeader>
      {isCard && (
        <CardContent className="flex items-center gap-2">
          <Button size={"sm"} asChild>
            <Link href={singlePostPath(id)}>
              Read <MoveUpRight />
            </Link>
          </Button>
          {(await isOwner(user.id)) && (
            <Button variant={"outline"} size={"sm"} asChild>
              <Link href={editPostPath(id)}>
                <Edit /> Edit
              </Link>
            </Button>
          )}
        </CardContent>
      )}
      {!isCard && (await isOwner(user.id)) && (
        <CardFooter>
          <DeleteButton id={id} />
        </CardFooter>
      )}
    </Card>
  );
}

export default PostItem;
