"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/features/post/actions/create-post";
import CardWrapper from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { postCreateSchema, postCreateSchemaType } from "../schemas";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import SubmitButton from "./submit-button";

function CreatePostForm() {
  const { execute, isPending } = useAction(createPost, {
    onSuccess: () => {
      toast.success("Post created successfully!");
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Something went wrong!");
    },
  });

  const form = useForm<postCreateSchemaType>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: postCreateSchemaType) {
    execute(data);
  }

  return (
    <CardWrapper
      title="Create new post"
      description="This will be create new post."
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
        <SubmitButton label="Create" isPending={isPending} />
      </form>
    </CardWrapper>
  );
}

export default CreatePostForm;
