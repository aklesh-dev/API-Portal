import { useSelectedTable, useTables } from "@/hooks/useHooks";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Loader2 } from "lucide-react";
import { DataTable } from "../DataTable/Table";
import { DynamicColumns } from "../DataTable/Columns/DynamicColumns";
import React from "react";
import { ChartPieInteractive } from "../Charts/PiaChart";
import { ChartBarLabelCustom } from "../Charts/BarChart";

const formSchema = z.object({
  tables: z.string(),
});

const DataViewerForm = () => {
  const { data, isLoading, error } = useTables();
  const Tables = data?.tables ?? [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tables: "",
    },
  });

  const selectedTable = form.watch("tables");
  //// console.log("Selected Tables", selectedTable);

  // --- Pagination state (controlled for server-side) ---
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const {
    data: TableData,
    isLoading: isTableDataLoading,
    error: isTableDataError,
  } = useSelectedTable(selectedTable, pageIndex, pageSize);

  //// console.log(`Selected Table data:`, TableData);

  const normalizeData = Array.isArray(TableData?.data)
    ? TableData?.data
    : TableData?.data
    ? [TableData?.data]
    : [];

  //// console.log("Normalize data:", normalizeData);

  const Tablecolumns = TableData?.columns ?? [];
  const columns = DynamicColumns(Tablecolumns);

  const totalRows = TableData?.recordsTotal ?? 0;
  const pageCount = Math.ceil(totalRows / pageSize);

  return (
    <section className=" p-2 min-h-screen">
      {/* chart here */}
      <div className="mb-2 flex max-md:flex-wrap gap-3 p-2">
        <div className="w-[33%] max-md:flex-1">
          <ChartPieInteractive />
        </div>
        <div className="flex-1">
          <ChartBarLabelCustom />
        </div>
      </div>

      {/* Date viewer */}
      <div className="bg-slate-100 rounded-md shadow p-2">
        {/* Form */}
        <Form {...form}>
          <form>
            <FormField
              name="tables"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select a Table</FormLabel>

                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-1/4">
                        <SelectValue placeholder="Select a table" />
                      </SelectTrigger>

                      <SelectContent>
                        {isLoading ? (
                          <div className="p-2 text-sm text-muted-foreground">
                            <Loader2 className="animate-spin" />
                            Loading tables...
                          </div>
                        ) : error ? (
                          <div className="p-2 text-sm text-red-500">
                            Failed to load tables
                          </div>
                        ) : (
                          <SelectGroup>
                            {Tables?.map((table: string) => (
                              <SelectItem value={table} key={table}>
                                {table}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>

        {/* Data Table */}
        <div className="mt-6 relative">
          {isTableDataLoading && (
            <div className="flex items-center justify-center gap-2 absolute inset-0 z-10 bg-white/50">
              <Loader className="animate-spin" size={35} />
              <span className="text-lg text-gray-700">Searching...</span>
            </div>
          )}

          {isTableDataError && (
            <p className="text-red-600 ml-4">Failed to load table data.</p>
          )}

          {selectedTable && (
            <DataTable
              data={normalizeData}
              columns={columns}
              manualPagination
              pageCount={pageCount}
              pageIndex={pageIndex}
              pageSize={pageSize}
              totalRows={totalRows}
              onPaginationChange={(updater) => {
                const newState =
                  typeof updater === "function"
                    ? updater({ pageIndex, pageSize })
                    : updater;
                setPageIndex(newState.pageIndex);
                setPageSize(newState.pageSize);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default DataViewerForm;
