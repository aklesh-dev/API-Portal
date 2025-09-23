import { exportCSV, exportExcel, exportJSON } from "@/utils/export";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FileJson, FileSpreadsheet, FileText } from "lucide-react";

interface ExportProps {
  data: any;
  fileName: string;
}

const ExportButtons = ({ data, fileName }: ExportProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button variant="outline">Export</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => exportJSON(data, `${fileName}.json`)} className="cursor-pointer">
          <FileJson className="mr-2 h-4 w-4" />
          Export JSON
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => exportCSV(data, `${fileName}.csv`)} className="cursor-pointer">
          <FileText className="mr-2 h-4 w-4" />
          Export CSV
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => exportExcel(data, `${fileName}.xlsx`)} className="cursor-pointer">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButtons;
