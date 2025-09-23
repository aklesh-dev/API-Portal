import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
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
import { Loader2 } from "lucide-react";
import { DataTable } from "../DataTable/Table";
import { blacklistSchema } from "@/schema/BlackList.schema";
import { useBlackList } from "@/hooks/useHooks";
import { BlackListColumns } from "../DataTable/Columns/BlackListColumns";
import { IMaskInput } from "react-imask";

const BlackListForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const borrowerName = searchParams.get("borrower_name");
  const date = searchParams.get("date");

  const { data, isLoading, error } = useBlackList({
    borrower_name: borrowerName,
    date,
  });

  // console.log("Black list data", data);

  const form = useForm({
    resolver: zodResolver(blacklistSchema),
    defaultValues: {
      borrower_name: borrowerName || "",
      date: date || null,
    },
  });

  const onSubmit = (formData: any) => {
    const params: Record<string, string> = {};

    if (formData.borrower_name) {
      params.borrower_name = formData.borrower_name;
    }

    if (formData.date) {
      params.date = formData.date;
    }

    setSearchParams(params);
  };

  // Normalize the data
  const normalizeData = Array.isArray(data?.data)
    ? data?.data
    : data?.data
    ? [data?.data]
    : [];

  // console.log("Normalize", normalizeData);

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
              name="borrower_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Borrower Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a borrower name"
                      {...field}
                      className="rounded-md h-[2.5rem]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date(YYYY-MM-DD) BS:</FormLabel>
                  <FormControl>
                    <IMaskInput
                      mask="0000-00-00"
                      placeholder="YYYY-MM-DD"
                      value={field.value ?? ""}
                      onAccept={(val) => field.onChange(val)}
                      className="rounded-md h-[2.5rem] px-2 border w-full"
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
        <p className="text-red-600 ml-4">
          Error fetching blacklist: {error.message}
        </p>
      )}

      {normalizeData.length > 0 && (
        <>
          <DataTable data={normalizeData} columns={BlackListColumns} />
        </>
      // ) : (
      //   <>
      //   <p className="text-center mt-4 font-semibold text-lg">No data found!</p>
       
      //   </>
      )}
    </section>
  );
};

export default BlackListForm;
