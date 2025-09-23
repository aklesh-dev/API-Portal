import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export function DynamicColumns(columns: any[]): ColumnDef<any>[] {
  return columns
    .filter((col) => col.visible) 
    .map((col) => ({
      id: col.data,
      accessorKey: col.data,
      enableSorting: true, 
      header:({column}) => {
        const sortState = column.getIsSorted();

        return(
          <Button
          variant={"ghost"}
          className="cursor-pointer hover:bg-zinc-500/5 flex items-center"
          onClick={() => column.toggleSorting(sortState === "asc")}
          >
            {col.title}
            {sortState === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
            {sortState === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
            {sortState === false && <ArrowUpDown className="ml-2 h-4 w-4" />}
          </Button>
        )
      },
      cell: ({ row }) => {
        const value = row.getValue(col.data);
        return <span>{formatCellValue(value)}</span>;
      },
    }));
}

function formatCellValue(value: any): string {
  if (value === null || value === undefined || value === "") return "-";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}