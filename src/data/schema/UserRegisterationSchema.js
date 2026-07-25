import Patterns from "@book-junction/patterns";
import { z } from "zod";

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
  captcha: z
    .string()
    .max(6, "Captcha cannot be greater than 6 characters.")
    .regex(/^[a-zA-Z0-9]{6}$/, "Invalid captcha"),

  // FIXED: Changed strings to RegExp literals /.../
  companyName: z
    .string()
    .regex(/^[A-Za-z0-9\s\-_().,]{4,64}$/, "Invalid company name"),
  address: z
    .string()
    .regex(/^[A-Za-z0-9\s\-_().,#]{4,128}$/, "Invalid company address"),
});
