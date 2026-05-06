"use client";

import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import SubmitButton from "../../../components/submit-button";
import { createComment } from "../actions/create-comment";
import {
  commentCreateSchema,
  commentCreateSchemaType,
} from "../schemas/comment.create";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface CreateCommentFormProps {
  parentId?: string;
  onSuccess?: () => void;
}

function CreateCommentForm({ parentId, onSuccess }: CreateCommentFormProps) {
  const params = useParams<{ id: string }>();

  const { execute, isPending } = useAction(createComment, {
    onSuccess: () => {
      form.reset();
      toast.success(parentId ? "Reply posted!" : "Comment posted!");
      if (onSuccess) onSuccess();
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Something went wrong!");
    },
  });

  const form = useForm<commentCreateSchemaType>({
    resolver: zodResolver(commentCreateSchema),
    defaultValues: {
      content: "",
      postId: params.id,
      parentId: parentId,
    },
  });

  function onSubmit(data: commentCreateSchemaType) {
    execute(data);
  }

  return (
    <div
      className={cn(
        "w-full transition-all duration-200",
        !parentId && "bg-card border rounded-lg p-4 shadow-sm",
      )}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {!parentId && (
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Leave a comment
          </h3>
        )}

        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                {...field}
                placeholder={
                  parentId ? "Write a reply..." : "What are your thoughts?"
                }
                className={cn(
                  "min-h-25 resize-none bg-background focus-visible:ring-1",
                  parentId && "min-h-20",
                )}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex justify-end gap-2">
          <SubmitButton
            label={parentId ? "Reply" : "Post Comment"}
            isPending={isPending}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateCommentForm;
