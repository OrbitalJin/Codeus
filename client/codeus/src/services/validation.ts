import { z } from "zod";

// Describe the shape of the form
export const createPostFormSchema = z.object({
  title: z
    .string({
      required_error: "Please enter a title",
    })
    .min(3)
    .max(100),
  description: z.string().max(100).optional(),
  content: z
    .string({
      required_error: "Please enter a content",
    })
    .min(3),
  language: z.string({
    required_error: "Please select a language",
  }),
  theme: z.string({
    required_error: "Please select a theme",
  }),
});

// Describes login schema
export const loginCredentialsSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z
    .string({
      required_error: "Please enter a password",
    })
    .min(8, "It must be at least 8 characters"),
});

// Descibes register schema
export const registerCredentialsSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Email is invalid" }),
    username: z.string().min(1, { message: "Email is required" }),
    handle: z.string().min(1, { message: "Handle is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const editProfileSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  bio: z.string(),
});
