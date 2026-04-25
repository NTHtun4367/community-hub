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

interface Props extends Post {
  isCard?: boolean;
  user: User;
}

async function PostItem({
  id,
  title,
  description,
  status,
  user,
  isCard = true,
}: Props) {
  const session = await getSession();

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
        <CardDescription className={cn(isCard && "line-clamp-2")}>
          {description}
        </CardDescription>
        <p className="text-sm text-muted-foreground font-medium">
          @{user.name}
        </p>
      </CardHeader>
      {isCard && (
        <CardContent className="flex items-center gap-2">
          <Button size={"sm"} asChild>
            <Link href={singlePostPath(id)}>
              Read <MoveUpRight />
            </Link>
          </Button>
          {user.id === session?.user.id && (
            <Button variant={"outline"} size={"sm"} asChild>
              <Link href={editPostPath(id)}>
                <Edit /> Edit
              </Link>
            </Button>
          )}
        </CardContent>
      )}
      {!isCard && user.id === session?.user.id && (
        <CardFooter>
          <DeleteButton id={id} />
        </CardFooter>
      )}
    </Card>
  );
}

export default PostItem;
