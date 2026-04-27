"use client";

import { Textarea } from "@/components/ui/textarea";
import CardWrapper from "../../../components/card-wrapper";
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

function CreateCommentForm() {
  const params = useParams<{ id: string }>();

  const { execute, isPending } = useAction(createComment, {
    onSuccess: () => {
      form.reset();
    },
    onError: ({ error }) => {
      const message = error.serverError || "Something went wrong!";
      toast.error(message);
    },
  });

  const form = useForm<commentCreateSchemaType>({
    resolver: zodResolver(commentCreateSchema),
    defaultValues: {
      content: "",
      postId: params.id,
    },
  });

  function onSubmit(data: commentCreateSchemaType) {
    execute(data);
  }

  return (
    <CardWrapper
      title="Create new comment"
      description="This will be create a new comment in this post."
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                placeholder="write a comment..."
                {...field}
                rows={6}
                className="min-h-24 resize-none"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <SubmitButton label="Create" isPending={isPending} />
      </form>
    </CardWrapper>
  );
}

export default CreateCommentForm;
