import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { panidSchema, type PANID } from "@/schema/PANID.schema";
import { usePan } from "@/hooks/useHooks";
import { Loader2 } from "lucide-react";
import { DataTable } from "../DataTable/Table";
import { columns } from "../DataTable/Columns/PANColumns";
import { useSearchParams } from "react-router";

const PANIDForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const panNo = searchParams.get("pan_no") || null;

  const { data, isLoading, error } = usePan(panNo);

  const form = useForm({
    resolver: zodResolver(panidSchema),
    defaultValues: {
      pan_no: panNo || "",
    },
  });


  const onSubmit = (data: PANID) => {
    setSearchParams({pan_no: data?.pan_no});
  };


  // Normalize the data
  const normalizeData = Array.isArray(data?.detail)
    ? data?.detail
    : data?.detail
    ? [data?.detail]
    : [];

  return (
    <section className="flex flex-col p-4">
      <div className="flex justify-center mb-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-1/2 p-2"
          >
            <FormField
              control={form.control}
              name="pan_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PAN Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000000000"
                      {...field}
                      className="rounded-md h-[2.5rem]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full rounded-md mt-6 h-[2.5rem] cursor-pointer active:scale-95 transition-all duration-150 ease-in-out"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>

      {/* Data table */}
      {isLoading && (
        <p className="flex items-center ml-4 gap-3 mt-2">
          <Loader2 className="animate-spin" />
          <span className="text-lg text-gray-700">Searching...</span>
        </p>
      )}

      {error && (
        <p className="text-red-600 ml-4">Error fetching pan: {error.message}</p>
      )}

      {normalizeData.length > 0 && (
        <>
          <DataTable data={normalizeData} columns={columns} />
        </>
      )}
    </section>
  );
};

export default PANIDForm;
