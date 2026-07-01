import Patterns from "@book-junction/patterns";
import { z } from "zod";
import { AppConstants } from "../../app/AppConstants";

export const UserRegisterSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(64)
    .regex(Patterns.common.name, "Invalid name"),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .regex(Patterns.common.email, "Invalid email"),
  phone: z.string().optional(),
  password: z
    .string()
    .regex(Patterns.common.password, "Invalid password")
    .min(8, { message: "Password must be at least 8 characters long" }),
  dob: z.string().regex(Patterns.common.dob, "Invalid date of birth"),
  isPwd: z.boolean().default(false),
  category: z.enum(AppConstants.ALLOWED_CATEGORIES, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  captcha: z
    .string()
    .max(6, "Captcha cannot be greater than 6 characters.")
    .regex(/^[a-zA-Z0-9]{6}$/, "Invalid captcha"),
});
