import { IMask, IMaskInput } from "react-imask";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { nidDetailsSchema, type NIDDetails } from "@/schema/NID.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const NidDetailsForm = ({onSearch, defaultValues}:any) => {

  const {full_name, dob, citizenship_issue_date} = defaultValues;
  
  const nidDetailsForm = useForm({
    resolver: zodResolver(nidDetailsSchema),
    defaultValues: {
      full_name: full_name || "",
      dob: dob || undefined,
      citizenship_issue_date: citizenship_issue_date || undefined,
    },
  });


  const onNidDetailsSubmit = (data: NIDDetails) => {
    onSearch({
      full_name: data.full_name,
      dob: data.dob,
      citizenship_issue_date: data.citizenship_issue_date,
    })
  };

  return (
    <Form {...nidDetailsForm}>
      <form
        onSubmit={nidDetailsForm.handleSubmit(onNidDetailsSubmit)}
        className="space-y-6"
      >
        <FormField
          control={nidDetailsForm.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  {...field}
                  className="rounded-md h-[2.5rem]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={nidDetailsForm.control}
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
        <FormField
          control={nidDetailsForm.control}
          name="citizenship_issue_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Citizenship Issued Date (YYYY-MM-DD) BS:</FormLabel>
              <FormControl>
                <IMaskInput
                  mask="0000-00-00"
                  placeholder="YYYY-MM-DD"
                  value={field.value}
                  onAccept={(val) => field.onChange(val)}
                  className="rounded-md h-[2.5rem] px-2 border w-full"
                  blocks={{
                    YYYY: {
                      mask: IMask.MaskedRange,
                      from: 2000,
                      to: 2200,
                    },
                    MM: {
                      mask: IMask.MaskedRange,
                      from: 1,
                      to: 12,
                      maxLength: 2,
                    },
                    DD: {
                      mask: IMask.MaskedRange,
                      from: 1,
                      to: 32,
                      maxLength: 2,
                    },
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full rounded-md mt-6 active:scale-95 transition-all duration-150 ease-in-out">
          Submit Details
        </Button>
      </form>

      
    </Form>
  );
};

export default NidDetailsForm;
