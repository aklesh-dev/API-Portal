import z from "zod";

const securePasswordSchema = z
  .string({
    message: "Password is required",
  })
  .min(8, "Password must be at least 8 characters long")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character"
  );

export const loginSchema = z.object({
  username: z.string().min(2, {message: "Username is required"}),
  password: z
    .string({ message: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export type Login = z.infer<typeof loginSchema>;

// Sign up Schema
export const signupSchema = z.object({
  username: z
    .string({ message: "Username is required." })
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(15, { message: "Username must least then 15 Characters." }),
  fullName: z
    .string({ message: "Full Name is required." })
    .min(3, { message: "Full Name must be at least 3 characters long." })
    .max(15, { message: "Full Name must least then 15 Characters." }),
  password: securePasswordSchema,
  email: z.email({message: "Invalid Email!!!"}),
});

export type Signup = z.infer<typeof signupSchema>;
