import * as z from "zod";

export const authBaseSchema = {
  email: z.email(),
  password: z.string().min(8),
};
