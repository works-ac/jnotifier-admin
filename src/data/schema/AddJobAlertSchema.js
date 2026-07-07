import z from "zod";

export const AddJobAlertSchema = z.object({
  noticeTitle: z
    .string()
    .max(100, "Notice title cannot be greater than 100 characters."),
  noticeDesc: z.string(),
  noticeTags: z.string().regex(/^[A-Za-z0-9\s\,]+$/, "Invalid notice tags"),
});
