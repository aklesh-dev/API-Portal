import { exportCSV, exportExcel, exportJSON } from "@/utils/export";

interface ExportProps {
  data: any;
  fileName: string;
}


const ExportButtons = ({data, fileName}: ExportProps) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => exportJSON(data, `${fileName}.json`)}
        className="px-3 py-2 bg-gray-700 text-white rounded"
      >
        Export JSON
      </button>
      <button
        onClick={() => exportCSV(data, `${fileName}.csv`)}
        className="px-3 py-2 bg-green-600 text-white rounded"
      >
        Export CSV
      </button>
      <button
        onClick={() => exportExcel(data, `${fileName}.xlsx`)}
        className="px-3 py-2 bg-purple-600 text-white rounded"
      >
        Export Excel
      </button>
    </div>
  );
};

export default ExportButtons;
