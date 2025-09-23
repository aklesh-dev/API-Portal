import { useCredit, useUsers } from "@/hooks/useHooks";
import { creditSchema, type Credit } from "@/schema/Credit.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Loader2 } from "lucide-react";

const CreditDialog = () => {
  const [open, setOpen] = useState(false);

  const creditMutation = useCredit();
  const { data: Users = [], isLoading, error } = useUsers();

  const form = useForm<Credit>({
    resolver: zodResolver(creditSchema),
    defaultValues: {
      username: "",
      credits: 0,
    },
  });

  async function onSubmit(formData: Credit) {
    creditMutation.mutate(formData, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          Manage Credits
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User Credits</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    {/* <Input
                      placeholder="Enter username"
                      {...field}
                      className="focus-visible:ring-[1px] hover:border-ring/75 transition-all duration-100 ease-in"
                    /> */}

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a User" />
                      </SelectTrigger>

                      <SelectContent>
                        {isLoading ? (
                          <div className="p-2 text-sm text-muted-foreground">
                            <Loader2 className="animate-spin" />
                            Loading users...
                          </div>
                        ) : error ? (
                          <div className="p-2 text-sm text-red-500">
                            Failed to load users
                          </div>
                        ) : (
                          <SelectGroup>
                            {Users.map((user: any) => (
                              <SelectItem value={user?.username} key={user?.id}>
                                {user?.username}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="credits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credit Point</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter credit point"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value || ""}
                      className="focus-visible:ring-[1px] hover:border-ring/75 transition-all duration-100 ease-in"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={creditMutation.isPending}>
                {creditMutation.isPending ? "Updating..." : "Update Credit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreditDialog;
