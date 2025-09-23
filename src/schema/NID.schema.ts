import z from "zod";

export const nidSchema = z.object({
  nid_no: z
    .string()
    .min(13, {
      message: "National ID Number is required.",
    })
    .regex(/^\d{3}-\d{3}-\d{3}-\d$/, {
      message: "NID must be in the format 000-000-000-0",
    }),
});

export type NID = z.infer<typeof nidSchema>;

export const nidDetailsSchema = z.object({
  full_name: z.string().min(1, {
    message: "Full Name is required.",
  }),
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
    }, "Invalid BS date range"),
  citizenship_issue_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Citizenship issued date must be in BS format (YYYY-MM-DD).",
    })
    .refine((val) => {
      const [year, month, day] = val.split("-").map(Number);
      return (
        year >= 2000 && year <= 2200 && month >= 1 && month <= 12 && day >= 1 && day <= 32
      );
    }, "Invalid BS date range"),
});

export type NIDDetails = z.infer<typeof nidDetailsSchema>;


// NID Params Paramete 
export const NIDParamsSchema = z.union([nidSchema, nidDetailsSchema]);
export type NIDParams = z.infer<typeof NIDParamsSchema>;

