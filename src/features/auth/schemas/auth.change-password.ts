import * as z from "zod";

export const changePasswordSchema = z.object({
  newPassword: z.string().min(8),
  token: z.string(),
});

export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>;
