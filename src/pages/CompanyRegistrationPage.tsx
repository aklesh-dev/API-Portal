import { useCompanys } from "@/hooks/useHooks";
import { exportCSV, exportExcel, exportJSON } from "@/utils/export";
import React from "react";

const CompanyRegistrationPage = () => {
  const [inputId, setInputId] = React.useState(""); // controlled input
  const [companyId, setCompanyId] = React.useState<string | undefined>(
    undefined
  ); // triggers query

  const { data, isLoading, error } = useCompanys(companyId!);

  console.log(`company data of id:${companyId}`, data);

  const handleSearch = () => {
    if (inputId.trim()) {
      setCompanyId(inputId.trim());
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 min-h-screen">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Company ID"
          value={inputId}
          onChange={(e) => {
            const value = e.target.value;
            if(/^\d*$/.test(value)) {
              setInputId(value)
            }
          }}
          className="border p-2 rounded flex-1 border-zinc-400"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error fetching company: {error.message}</p>}

      {data?.detail?.length > 0 && (
        <>
          <div className="flex gap-2">
            <button
              onClick={() => exportJSON(data.detail, "companies.json")}
              className="px-3 py-2 bg-gray-700 text-white rounded"
            >
              Export JSON
            </button>
            <button
              onClick={() => exportCSV(data.detail, "companies.csv")}
              className="px-3 py-2 bg-green-600 text-white rounded"
            >
              Export CSV
            </button>
            <button
              onClick={() => exportExcel(data.detail, "companies.xlsx")}
              className="px-3 py-2 bg-purple-600 text-white rounded"
            >
              Export Excel
            </button>
          </div>

          <div className="mt-4 border p-4 rounded bg-gray-50">
            {data.detail.map((company: any, idx: number) => (
              <div key={idx} className="mb-4">
                <h2 className="font-bold text-lg">{company.company_name}</h2>
                <p>Reg No: {company.registration_no}</p>
                <p>Date: {company.registration_date}</p>
                <p>Type: {company.company_type}</p>
                <p>Address: {company.address}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyRegistrationPage;
