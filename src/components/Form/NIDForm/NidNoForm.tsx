import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { nidSchema, type NID } from "@/schema/NID.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
// import { useSearchParams } from "react-router";

const NidNoForm = ({ onSearch, defaultValues }: any) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const { nid_no } = defaultValues;

  const nidForm = useForm({
    resolver: zodResolver(nidSchema),
    defaultValues: {
      nid_no: nid_no || "",
      // nid_no: searchParams.get("nid_no") || "",
    },
  });

  const onNidSubmit = (data: NID) => {
    onSearch({ nid_no: data.nid_no });
    // setSearchParams({nid_no: data.nid_no})
  };

  return (
    <Form {...nidForm}>
      <form onSubmit={nidForm.handleSubmit(onNidSubmit)} className="space-y-6">
        <FormField
          control={nidForm.control}
          name="nid_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NID Number</FormLabel>
              <FormControl>
                <IMaskInput
                  mask="000-000-000-0"
                  placeholder="000-000-000-0"
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
          className="w-full rounded-md mt-6 active:scale-95 transition-all duration-150 ease-in-out"
        >
          Submit NID
        </Button>
      </form>
    </Form>
  );
};

export default NidNoForm;
