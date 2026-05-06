import * as z from "zod";

export const commentCreateSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Comment must be at least 1 characters" })
    .max(500, { message: "Comment cannot exceed 500 characters" }),
  postId: z.string().min(1, { message: "Post ID is required" }),
  parentId: z.string().optional(),
});

export type commentCreateSchemaType = z.infer<typeof commentCreateSchema>;
