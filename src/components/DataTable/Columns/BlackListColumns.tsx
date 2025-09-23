import type { ColumnDef } from "@tanstack/react-table";

export const BlackListColumns: ColumnDef<any>[] = [
  {
    accessorKey: "blacklist_no",
    header: "BlackList No",
  },
  {
    accessorKey: "blacklist_date",
    header: "BlackList Date",
  },
  {
    accessorKey: "borrower_name",
    header: "Borrower Name",
  },
  {
    accessorKey: "associated_person_fm_companies",
    header: "Associated person with company",
  },
];
