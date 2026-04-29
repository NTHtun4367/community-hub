"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/features/post/actions/create-post";
import CardWrapper from "../../../components/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { postCreateSchema, postCreateSchemaType } from "../schemas";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import SubmitButton from "../../../components/submit-button";
import ImageUpload from "./image-upload";
import RichTextEditor from "@/components/rich-text-editor";

function CreatePostForm() {
  const { execute, isPending } = useAction(createPost, {
    onSuccess: () => {
      form.reset();
      toast.success("Post created successfully!");
    },
    onError: ({ error }) => {
      const message = error.serverError || "Something went wrong!";
      toast.error(message);
    },
  });

  const form = useForm<postCreateSchemaType>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
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
              <FieldLabel>Content</FieldLabel>
              <RichTextEditor value={field.value} onChange={field.onChange} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="images"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Images</FieldLabel>
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                max={4}
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
