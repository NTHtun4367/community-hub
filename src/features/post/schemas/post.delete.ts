import * as z from "zod";

export const postDeleteSchema = z.object({
  id: z.string(),
});
