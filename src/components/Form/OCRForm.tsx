import { useCompanys } from "@/hooks/useHooks";
import React from "react";
import { DataTable } from "../DataTable/Table";
import { columns } from "../DataTable/Columns/OCRColumns";
import { Loader2 } from "lucide-react";
import { ocrSchema, type OCR } from "@/schema/OCR.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const OCRForm = () => {
  const [companyId, setCompanyId] = React.useState<
    OCR["company_id"] | undefined
  >(undefined);

  const { data, isLoading, error } = useCompanys(companyId!);

  const form = useForm({
    resolver: zodResolver(ocrSchema),
    defaultValues: {
      company_id: "",
    },
  });

  const onSubmit = (data: OCR) => {
    setCompanyId(data.company_id);
  };

  return (
    <section className="p-4 flex flex-col gap-4">
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-1/2 p-2"
          >
            <FormField
              control={form.control}
              name="company_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Register No </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Company Register no"
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

      {isLoading && (
        <p className="flex items-center ml-4 gap-3 mt-2">
          <Loader2 className="animate-spin" />
          <span className="text-lg text-gray-700">Searching...</span>
        </p>
      )}

      {error && (
        <p className="text-red-600 ml-4">
          Error fetching company: {error.message}
        </p>
      )}

      {data?.detail?.length > 0 && (
        <>
          <DataTable data={data?.detail} columns={columns} />
        </>
      )}
    </section>
  );
};

export default OCRForm;
