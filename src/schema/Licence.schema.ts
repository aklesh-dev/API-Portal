import z from "zod";


export const licenceSchema = z.object({
  license_no: z.string().min(1, {message: "Licence no is required."}),
  dob: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date of Birth must be in AD format (YYYY-MM-DD).",
      })
      .refine((val) => {
        const [year, month, day] = val.split("-").map(Number);
        return (
          year >= 1900 && year <= 2100 && month >= 1 && month <= 12 && day >= 1 && day <= 32
        );
      }, "Invalid BS date range").nullable(),
})

export type Licence = z.infer<typeof licenceSchema>;