import React from "react";
import NidNoForm from "./NidNoForm";
import NidDetailsForm from "./NidDetailsForm";
import { useNID } from "@/hooks/useHooks";
import { Loader2 } from "lucide-react";
import { DataTable } from "@/components/DataTable/Table";
import { columns } from "@/components/DataTable/Columns/NIDColumns";
import type { NIDParams } from "@/schema/NID.schema";
import { useSearchParams } from "react-router";

const NIDForm = () => {
  const [activeTab, setActiveTab] = React.useState<"nid" | "nidDetails">("nid");
  const [params, setParams] = React.useState<NIDParams | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const nidNo = searchParams.get("nid_no");
    const fullName = searchParams.get("full_name");
    const dob = searchParams.get("dob");
    const citizenship_issue_date = searchParams.get("citizenship_issue_date");

    if (nidNo) {
      setParams({ nid_no: nidNo });
      setActiveTab("nid");
    } else if (fullName || dob || citizenship_issue_date) {
      setParams({
        full_name: fullName ?? "",
        dob: dob ?? "",
        citizenship_issue_date: citizenship_issue_date ?? "",
      });
      setActiveTab("nidDetails");
    }
  }, [searchParams]);

  const handleSearch = (newParams: NIDParams) => {
    setParams(newParams);
    setSearchParams(newParams as any); // keeps state in URL
  };

  // hook
  const { data, isLoading, error } = useNID(params);

  // Normalize the data.
  const normalize = Array.isArray(data) ? data : data ? [data] : [];
  // console.log("NId data", normalize);

  return (
    <section className="mt-2 p-2 ">
      <div className="flex justify-center mb-6">
        <div className="w-1/2">
          {/* Tab buttons to switch between forms */}
          <div className="flex mb-6 rounded-md overflow-hidden shadow-sm">
            <div
              onClick={() => setActiveTab("nid")}
              className={`flex-1 text-center py-3 px-4 cursor-pointer font-medium transition-all duration-300 ${
                activeTab === "nid"
                  ? "bg-primary text-white shadow-inner"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              NID
            </div>
            <div
              onClick={() => setActiveTab("nidDetails")}
              className={`flex-1 text-center py-3 px-4 cursor-pointer font-medium transition-all duration-300 ${
                activeTab === "nidDetails"
                  ? "bg-primary text-white shadow-inner"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              NID Details
            </div>
          </div>

          {/* Conditional rendering based on the active tab state */}
          {activeTab === "nid" ? (
            <NidNoForm onSearch={handleSearch} defaultValues={{
              nid_no: searchParams.get("nid_no") ?? ""
            }} />
          ) : (
            <NidDetailsForm
              onSearch={handleSearch}
              defaultValues={{
                full_name: searchParams.get("full_name") ?? "",
                dob: searchParams.get("dob") ?? "",
                citizenship_issue_date:
                  searchParams.get("citizenship_issue_date") ?? "",
              }}
            />
          )}
        </div>
      </div>

      {isLoading && (
        <p className="flex items-center ml-4 gap-3 mt-2">
          <Loader2 className="animate-spin" />
          <span className="text-lg text-gray-700">Searching...</span>
        </p>
      )}

      {error && (
        <p className="text-red-600 ml-4">
          Error fetching NID details: {error.message}
        </p>
      )}

      {/* Data Table */}
      {normalize?.length > 0 && (
        <>
          <DataTable columns={columns} data={normalize} />
        </>
      )}
    </section>
  );
};

export default NIDForm;
