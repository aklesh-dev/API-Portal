import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "pan_no",
    header: "Pan no",
  },
  {
    accessorKey: "trade_name",
    header: "Trade Name",
  },
  {
    accessorKey: "ward_no",
    header: "Ward No",
  },
  {
    accessorKey: "street_name",
    header: "Street Name",
  },
  {
    accessorKey: "vdc_town",
    header: "VDC",
  },
  {
    accessorKey: "telephone",
    header: "Telephone",
    cell: ({ row }) => {
      const value = row.original.telephone;

      if (!value) {
        return <span className="bg-secondary px-1 rounded shadow">-</span>;
      }

      return <span>{value}</span>;
    },
  },
  {
    accessorKey: "mobile",
    header: "mobile",
  },
  {
    accessorKey: "eff_reg_date",
    header: "Register Date",
  },
  {
    accessorKey: "account_type",
    header: "Account Type",
  },
  {
    accessorKey: "office_name",
    header: "Office Name",
  },
  {
    accessorKey: "account_status",
    header: "Account Status",
  },
  {
    accessorKey: "is_personal",
    header: "Personal",
  },
];
