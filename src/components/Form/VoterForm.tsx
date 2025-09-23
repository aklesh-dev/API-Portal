import { useVoter } from "@/hooks/useHooks";
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
import { voterSchema, type Voter } from "@/schema/Voter.schema";
import { IMaskInput } from "react-imask";
import { VoterColumns } from "../DataTable/Columns/VoterColumns";
// import { useState } from "react";

const ElectionForm = () => {
  // const [params, setParams] = useState<Voter | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const voterId = searchParams.get("voter_id");
  const dob = searchParams.get("dob");
  const citizenshipNo = searchParams.get("citizenship_no");

  const { data, isLoading, error } = useVoter({
    voter_id: voterId!,
    citizenship_no: citizenshipNo!,
    dob: dob!,
  });

  const form = useForm({
    resolver: zodResolver(voterSchema),
    defaultValues: {
      voter_id: voterId || "",
      citizenship_no: citizenshipNo || "",
      dob: dob || "",
    },
  });

  // console.log("Voter data", data);

  const onSubmit = (formData: Voter) => {
    // setParams(data)
    const params: Record<string, string> = {
      voter_id: formData.voter_id,
    };

    if (formData.dob && formData.dob.trim() !== "") {
      params.dob = formData.dob!;
    }
    if (formData.citizenship_no && formData.citizenship_no.trim() !== "") {
      params.citizenship_no = formData.citizenship_no;
    }

    setSearchParams(params);
    // console.log("Params:", params);
  };

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
              name="voter_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voter No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter voter no"
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
              name="citizenship_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Citizenship No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter citizenship no"
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
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth (YYYY-MM-DD) BS:</FormLabel>
                  <FormControl>
                    <IMaskInput
                      mask="0000-00-00"
                      placeholder="YYYY-MM-DD"
                      value={field.value}
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
        <p className="text-red-600 ml-4">Error fetching pan: {error.message}</p>
      )}

      {normalizeData.length > 0 && (
        <>
          <DataTable data={normalizeData} columns={VoterColumns} />
        </>
      )}
    </section>
  );
};

export default ElectionForm;
