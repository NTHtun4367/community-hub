import * as z from "zod";
import { authBaseSchema } from "./auth.base";

export const signUpSchema = z
  .object({
    ...authBaseSchema,
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Please confirm your password" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match!",
        path: ["confirmPassword"],
      });
    }
  });

export type signUpSchemaType = z.infer<typeof signUpSchema>;
