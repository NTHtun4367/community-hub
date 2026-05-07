import z from "zod";

export const notiSchema = z.object({
  id: z.string().min(1, { message: "Notification ID is required" }),
});
