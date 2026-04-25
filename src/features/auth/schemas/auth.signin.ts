import * as z from "zod";
import { authBaseSchema } from "./auth.base";

export const signInSchema = z.object({
  ...authBaseSchema,
});

export type signInSchemaType = z.infer<typeof signInSchema>;
