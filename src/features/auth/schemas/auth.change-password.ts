import * as z from "zod";

export const changePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "New password must be at least 8 characters" }),
  token: z.string().min(1, { message: "Token is required" }),
});

export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>;
