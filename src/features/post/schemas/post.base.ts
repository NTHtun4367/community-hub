import * as z from "zod";

export const postBaseSchema = {
  title: z.string().min(3).max(100),
  description: z.string().min(3),
  images: z.array(z.string()).max(4),
  tags: z.array(z.string().trim().min(1).max(20)).max(5),
};
