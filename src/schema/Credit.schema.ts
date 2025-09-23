import z from "zod";

export const creditSchema = z.object({
  username: z.string().min(1, { message: "Username is require." }),
  credits: z
    .number({ message: "Credit point must be a valid number."})
    .min(1, { message: "Credit point is required." })
    .positive({ message: "Credit point must be a positive number" }),
});

export type Credit = z.infer<typeof creditSchema>;
