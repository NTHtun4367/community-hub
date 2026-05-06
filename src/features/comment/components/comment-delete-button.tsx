"use client";

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
import { toast } from "sonner";
import { deleteComment } from "../actions/delete-comment";
import { Trash2, Loader2 } from "lucide-react";

interface CommentDeleteButtonProps {
  id: string;
}

function CommentDeleteButton({ id }: CommentDeleteButtonProps) {
  const { execute, isPending } = useAction(deleteComment, {
    onSuccess: () => toast.success("Comment deleted"),
    onError: ({ error }) => {
      toast.error(error.serverError || "Something went wrong!");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center text-xs text-muted-foreground hover:text-destructive transition-colors">
          <Trash2 className="w-3.5 h-3.5 mr-1" />
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Comment?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All nested replies will also be
            managed based on server settings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => execute({ id })}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CommentDeleteButton;
