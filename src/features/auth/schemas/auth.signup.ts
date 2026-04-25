import * as z from "zod";
import { authBaseSchema } from "./auth.base";

export const signUpSchema = z
  .object({
    ...authBaseSchema,
    name: z.string().min(3),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password not match!",
        path: ["confirmPassword"],
      });
    }
  });

export type signUpSchemaType = z.infer<typeof signUpSchema>;
