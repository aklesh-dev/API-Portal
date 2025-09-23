import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// ✅ Export JSON (raw file)
export function exportJSON(data: any[], filename = "data.json") {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  saveAs(blob, filename);
}

// ✅ Export CSV
export function exportCSV(data: any[], filename = "data.csv") {
  if (!data.length) return;
  const header = Object.keys(data[0]).join(",");
  const rows = data.map((row) =>
    Object.values(row).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
  );
  const csvContent = "\ufeff" + header + "\n" + rows;
  // const csvContent = [header, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
}

// ✅ Export Excel
export function exportExcel(data: any[], filename = "data.xlsx") {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, filename);
}
