import z from "zod";
import dayjs from "dayjs";

export const BulkJobRowSchema = z
  .object({
    title: z
      .string({ required_error: "Job application title is required" })
      .trim()
      .min(1, "Job title is required")
      .max(100, "Job title must not exceed 100 characters"),
    shortDescription: z
      .string({ required_error: "Job description is required" })
      .trim()
      .min(10, "Job description is too short (min 10 characters)")
      .max(700, "Job description must not exceed 700 characters"),
    tags: z
      .string({ required_error: "Job tags are required" })
      .trim()
      .min(1, "Job tags are required"),
    applicationStartDate: z
      .string({ required_error: "Start date is required" })
      .refine((val) => dayjs(val).isValid(), "Invalid start date format")
      .refine((val) => {
        const d = dayjs(val).startOf("day");
        const minDate = dayjs().startOf("day").subtract(10, "day");
        return !d.isBefore(minDate);
      }, "Start date cannot be older than 10 days from today"),
    applicationEndDate: z
      .string({ required_error: "End date is required" })
      .refine((val) => dayjs(val).isValid(), "Invalid end date format"),
    advNo: z
      .string()
      .trim()
      .max(100, "Advertisement number must not exceed 100 characters")
      .optional()
      .nullable()
      .or(z.literal("")),
    applyLink: z
      .string({ required_error: "Apply link is required" })
      .trim()
      .min(5, "Apply link is too short")
      .max(250, "Apply link must not exceed 250 characters")
      .regex(
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?/,
        "Apply link must be a valid URL (e.g. https://...)",
      ),
  })
  .refine(
    (data) => {
      if (!data.applicationStartDate || !data.applicationEndDate) return true;
      const start = dayjs(data.applicationStartDate).startOf("day");
      const end = dayjs(data.applicationEndDate).startOf("day");
      return !end.isBefore(start);
    },
    {
      message: "End date cannot be before start date",
      path: ["applicationEndDate"],
    },
  );

/**
 * Validates a single row object and returns an object:
 * { isValid: boolean, errors: { [fieldName]: string } }
 */
export function validateBulkJobRow(row) {
  const result = BulkJobRowSchema.safeParse(row);
  if (result.success) {
    return { isValid: true, errors: {} };
  }

  const errors = {};
  result.error.issues.forEach((issue) => {
    const field = issue.path[0] || "_global";
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  });

  return { isValid: false, errors };
}
