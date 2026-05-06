import * as z from "zod";

export const postBaseSchema = {
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title can't exceed 100 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  images: z
    .array(z.string())
    .max(4, { message: "You can upload up to 4 images only" }),
  tags: z
    .array(
      z
        .string()
        .trim()
        .min(1, { message: "Tag can't be empty" })
        .max(20, { message: "Tag is too long" }),
    )
    .max(5, { message: "Maximum 5 tags allowed" }),
};
