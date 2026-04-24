import * as z from "zod";
import { postBaseSchema } from "./post.base";

export const postCreateSchema = z.object({
  ...postBaseSchema,
});

export type postCreateSchemaType = z.infer<typeof postCreateSchema>;
