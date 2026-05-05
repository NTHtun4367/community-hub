import z from "zod";

export const notiSchema = z.object({
  id: z.string(),
});
