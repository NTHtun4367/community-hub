import * as z from "zod";

export const commentDeleteSchema = z.object({
  id: z.string().min(1, { message: "Comment ID is required" }),
});

export type commentDeleteSchemaType = z.infer<typeof commentDeleteSchema>;
