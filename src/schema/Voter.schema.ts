import z from "zod";

export const voterSchema = z.object({
  voter_id: z.string().min(2 , {message: "Voter id is required."}),
  citizenship_no: z.string().optional().or(z.literal("")),
  dob:z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date of Birth must be in BS format (YYYY-MM-DD).",
      })
      .refine((val) => {
        const [year, month, day] = val.split("-").map(Number);
        return (
          year >= 1900 && year <= 2200 && month >= 1 && month <= 12 && day >= 1 && day <= 32
        );
      }, "Invalid BS date range").optional().or(z.literal("")),
});

export type Voter = z.infer<typeof voterSchema>;
