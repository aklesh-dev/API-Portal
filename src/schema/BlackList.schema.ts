import z from "zod";

export const blacklistSchema = z.object({
  borrower_name: z.string().optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in BS format (YYYY-MM-DD).",
    })
    .refine((val) => {
      const [year, month, day] = val.split("-").map(Number);
      return (
        year >= 1900 &&
        year <= 2200 &&
        month >= 1 &&
        month <= 12 &&
        day >= 1 &&
        day <= 32
      );
    }, "Invalid BS date range").nullable(),
});

export type BlackList = z.infer<typeof blacklistSchema>;
