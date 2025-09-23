import { type ColumnDef } from "@tanstack/react-table"
import z from "zod";
import { Button } from "../../ui/button";
import { ArrowUpDown } from "lucide-react";

export const ocrSchema = z.object({
  address: z.string(),
  companyName: z.string(),
  company_type: z.string(),
  recentOCR: z.string(),
  registrationDate: z.string(),
  registrationId: z.string(),
});

export type ocr = z.infer<typeof ocrSchema>;

export const columns: ColumnDef<ocr>[] = [
  {
    accessorKey: "address",
    header: ({column}) => {
      return (
        <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="cursor-pointer hover:bg-zinc-500/5"
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "company_name",
    header: "Company Name",
  },
  {
    accessorKey: "company_type",
    header: "Company Type",
    cell: ({row}) => {
      const company = row.original.company_type

      return <div title={company} className="max-w-[400px] truncate">{company}</div>
    }
  },
  
  {
    accessorKey: "recent_ocr",
    header: "Recent OCR",
  },
  {
    accessorKey: "registration_no",
    header: "Registration No",
  },
  {
    accessorKey: "registration_date",
    header: "Registration Date",
  },
  
  
]