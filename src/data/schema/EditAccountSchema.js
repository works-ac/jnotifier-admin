import Patterns from "@book-junction/patterns";
import { z } from "zod";

export const EditAccountSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full Name must be at least 3 characters long" })
    .max(64, { message: "Full Name must be at most 64 characters long" })
    .regex(Patterns.common.name, "Invalid name format"),
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .optional()
    .or(z.literal("")),
  category: z
    .enum(["GEN", "EWS", "OBC", "SC", "ST"], {
      message: "Please select a valid category (GEN, EWS, OBC, SC, ST)",
    })
    .optional()
    .or(z.literal("")),
  gender: z.enum(["M", "F", "T"], {
    message: "Gender must be Male (M), Female (F), or Transgender (T)",
  }),
  companyName: z
    .string()
    .regex(
      /^[A-Za-z0-9\s\-_().,]{4,64}$/,
      "Company name must be between 4 and 64 characters and contain only alphanumeric or common punctuation characters",
    )
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .regex(
      /^[A-Za-z0-9\s\-_().,#]{4,128}$/,
      "Address must be between 4 and 128 characters and contain only alphanumeric or common punctuation characters",
    )
    .optional()
    .or(z.literal("")),
});
