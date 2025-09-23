import { licenceSchema, type Licence } from "@/schema/Licence.schema";
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
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useLicence } from "@/hooks/useHooks";
import { DataTable } from "../DataTable/Table";
import { LicenceColumns } from "../DataTable/Columns/LicenceColumns";
import { IMaskInput } from "react-imask";

const LicenceForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const licenceNo = searchParams.get("license_no");
  const dob = searchParams.get("dob");

  // hook
  const { data, isLoading, error } = useLicence({
    license_no: licenceNo!,
    dob: dob,
  });

  const form = useForm({
    resolver: zodResolver(licenceSchema),
    defaultValues: {
      license_no: licenceNo || "",
      dob: dob || null,
    },
  });

  const onSubmit = (data: Licence) => {
   
    if (data.dob) {
      setSearchParams({
        license_no: data?.license_no,
        dob: data?.dob,
      });
    } else {
      setSearchParams({
        license_no: data?.license_no,
      });
    }
  };

  //
  const normalizeData = Array.isArray(data) ? data : data ? [data] : [];

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
              name="license_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Licence Number</FormLabel>
                  <FormControl>
                    <IMaskInput
                      mask="00-00-00000000"
                      placeholder="00-00-00000000"
                      value={field.value}
                      onAccept={(val) => field.onChange(val)}
                      className="rounded-md h-[2.5rem] px-2 border w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth (YYYY-MM-DD) AD:</FormLabel>
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
          Error fetching licence details: {error.message}
        </p>
      )}

      {normalizeData.length > 0 && (
        <>
          {/* <ExportButtons data={normalizeData} fileName="pan" /> */}
          <DataTable data={normalizeData} columns={LicenceColumns} />
        </>
      )}
    </section>
  );
};

export default LicenceForm;
