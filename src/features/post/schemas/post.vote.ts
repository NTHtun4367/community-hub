import * as z from "zod";

export const postVoteSchema = z.object({
  postId: z.string(),
  value: z.number().int().min(-1).max(1),
});
