import * as z from "zod";

export const commentDeleteSchema = z.object({
  id: z.string(),
});

export type commentDeleteSchemaType = z.infer<typeof commentDeleteSchema>;
