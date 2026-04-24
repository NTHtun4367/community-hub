"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Post } from "../types/post";
import { updatePost } from "../actions/update-post";
import SubmitButton from "./submit-button";
import CardWrapper from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { postUpdateSchema, postUpdateSchemaType } from "../schemas";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";

interface EditPostFormProps {
  post: Post;
}

function EditPostForm({ post }: EditPostFormProps) {
  const { execute, isPending } = useAction(updatePost, {
    onSuccess: () => {
      toast.success("Post updated successfully!");
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Something went wrong!");
    },
  });

  const form = useForm<postUpdateSchemaType>({
    resolver: zodResolver(postUpdateSchema),
    defaultValues: {
      id: post.id as string,
      title: post.title,
      description: post.description,
    },
  });

  function onSubmit(data: postUpdateSchemaType) {
    execute(data);
  }

  return (
    <CardWrapper
      title="Update existing post"
      description="This will be update existing post."
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input {...field} id="title" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                {...field}
                id="description"
                rows={6}
                className="min-h-24 resize-none"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <SubmitButton label="Update" isPending={isPending} />
      </form>
    </CardWrapper>
  );
}

export default EditPostForm;
