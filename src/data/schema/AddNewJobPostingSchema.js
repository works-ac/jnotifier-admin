import z from "zod";

export const AddNewJobPostingSchema = z.object({
  title: z
    .string()
    .max(32, "Job application title is too long")
    .min(1, "Job application title is too short"),
  applicationStartDate: z.string(),
  applicationEndDate: z.string(),
  tags: z.string(),
  shortDescription: z.string().max(700, "Short description is too long"),
  advNo: z.string().max(100, "Advertisement number is too long").optional(),
  applyLink: z.string().max(2048, "Apply link is too long"),
});
