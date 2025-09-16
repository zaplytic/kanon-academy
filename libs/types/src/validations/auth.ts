import * as z from "zod";

export const registrationSchema = z.object({
  body: z
    .object({
      full_name: z.string().min(5, "Full name must be at least 5 characters long").max(100),
      email: z
        .string()
        .trim()
        .transform((v) => v.toLowerCase())
        .pipe(z.email("Please provide a valid email")),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(128, "Password can't be longer than 128 characters"),
      password_confirmation: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(128, "Password can't be longer than 128 characters"),
      role: z.enum(["student", "instructor"]).optional()
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Passwords do not match",
      path: ["password_confirmation"]
    })
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .transform((v) => v.toLowerCase())
      .pipe(z.email("Please provide a valid email")),
    password: z.string().min(6, "Password is too short").max(128, "Password is too long")
  })
});
