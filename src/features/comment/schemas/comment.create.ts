import * as z from "zod";

export const commentCreateSchema = z.object({
  content: z.string().min(3),
  postId: z.string(),
});

export type commentCreateSchemaType = z.infer<typeof commentCreateSchema>;
