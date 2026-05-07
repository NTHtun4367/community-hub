import * as z from "zod";

export const resetPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
