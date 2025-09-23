import z from "zod";

export const ocrSchema = z.object({
  company_id: z.string().min(1, {
    message: "Company Registration is required.",
  }),
});

export type OCR = z.infer<typeof ocrSchema>;
