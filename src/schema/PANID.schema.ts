import z from "zod";

export const panidSchema = z.object({
  pan_no: z.string({ message: "Pan no is required." })
  .min(9, {message: "Pan no must be at least 9 characters long."}),
});

export type PANID = z.infer<typeof panidSchema>;
