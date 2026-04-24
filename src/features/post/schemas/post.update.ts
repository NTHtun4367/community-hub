import * as z from "zod";
import { postBaseSchema } from "./post.base";

export const postUpdateSchema = z.object({
  id: z.string(),
  ...postBaseSchema,
});

export type postUpdateSchemaType = z.infer<typeof postUpdateSchema>;
