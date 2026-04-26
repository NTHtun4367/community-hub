"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { deletePost } from "../actions/delete-post";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { postsPath } from "@/path";

interface DeleteButtonProps {
  id: string;
}

function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();
  const { execute, isPending, hasSucceeded } = useAction(deletePost, {
    onSuccess: () => {
      toast.success("Post deleted successfully!");
    },
    onError: ({ error }) => {
      const message = error.serverError || "Something went wrong!";
      toast.error(message);
    },
  });

  useEffect(() => {
    if (hasSucceeded) {
      router.push(postsPath);
    }
  }, [hasSucceeded]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"sm"}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={"destructive"}
              disabled={isPending}
              onClick={() => execute({ id })}
              className="text-white"
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteButton;
