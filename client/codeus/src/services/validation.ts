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
});

// Desctip login scema

export const userCredentialsSchema = z.object({
  email: z.string({
    required_error: "Please enter an email adress",
  }),
  password: z
    .string({
      required_error: "Please enter a password",
    })
    .min(8, "Password must contain at least 8 characters"),
});
