import * as z from "zod";

export const resetPasswordSchema = z.object({
  email: z.email(),
});

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
