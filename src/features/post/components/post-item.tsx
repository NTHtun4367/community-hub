"use client";

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
import { singlePostPath } from "@/path";
import { Post } from "@/features/post/types/post";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { deletePost } from "../actions/delete-post";

interface Props extends Post {
  isCard?: boolean;
}

function PostItem({ id, title, description, isCard = true }: Props) {
  const deletePostHandler = async () => {
    await deletePost(id as string);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className={cn(isCard && "line-clamp-2")}>
          {description}
        </CardDescription>
      </CardHeader>
      {isCard && (
        <CardContent>
          <Button variant={"outline"} size={"sm"} asChild>
            <Link href={singlePostPath(id)}>
              Read <MoveUpRight />
            </Link>
          </Button>
        </CardContent>
      )}
      {!isCard && (
        <CardFooter>
          <Button variant={"destructive"} onClick={deletePostHandler}>
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default PostItem;
