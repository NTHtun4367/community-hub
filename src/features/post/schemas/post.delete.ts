import * as z from "zod";

export const postDeleteSchema = z.object({
  id: z.string().min(1, { message: "Post ID is required to delete" }),
});
