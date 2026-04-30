"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updatePost } from "../actions/update-post";
import SubmitButton from "../../../components/submit-button";
import CardWrapper from "../../../components/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { postUpdateSchema, postUpdateSchemaType } from "../schemas";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Post } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";
import { postsPath } from "@/path";
import { useEffect } from "react";
import ImageUpload from "./image-upload";
import RichTextEditor from "@/components/rich-text-editor";
import TagInput from "./tag-input";

interface EditPostFormProps {
  post: Post;
}

function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter();
  const { execute, isPending, hasSucceeded } = useAction(updatePost, {
    onSuccess: () => {
      toast.success("Post updated successfully!");
    },
    onError: ({ error }) => {
      const message = error.serverError || "Something went wrong!";
      toast.error(message);
    },
  });

  const form = useForm<postUpdateSchemaType>({
    resolver: zodResolver(postUpdateSchema),
    defaultValues: {
      id: post.id as string,
      title: post.title,
      description: post.description,
      images: post.images || [],
      tags: post.tags || [],
      status: post.status,
    },
  });

  function onSubmit(data: postUpdateSchemaType) {
    execute(data);
  }

  useEffect(() => {
    if (hasSucceeded) {
      router.push(postsPath);
    }
  }, [hasSucceeded]);

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
        <Controller
          name="tags"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Tags</FieldLabel>
              <TagInput value={field.value} onChange={field.onChange} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="status"
                  aria-invalid={fieldState.invalid}
                  className="w-full"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  <SelectItem value="DONE">DONE</SelectItem>
                  <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
                </SelectContent>
              </Select>
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
