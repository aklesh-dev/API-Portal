"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signupSchema, type Signup } from "@/schema/Auth.schema";
import { useRegister } from "@/hooks/useHooks";

export function SignupForm() {
  const signupMutation = useRegister()

  const form = useForm<Signup>({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: "", email: "", password: "", fullName: "" },
  });

  function onSubmit(formData: Signup) {
    signupMutation.mutate(formData)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-sm mx-auto"
      >
        <h2 className="text-2xl font-bold">Register</h2>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter username"
                  {...field}
                  className="focus-visible:ring-[1px] hover:border-ring/75 transition-all duration-100 ease-in"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter full name"
                  {...field}
                  className="focus-visible:ring-[1px] hover:border-ring/75 transition-all duration-100 ease-in"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email"
                  {...field}
                  className="focus-visible:ring-[1px] hover:border-ring/75 transition-all duration-100 ease-in"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                  className="focus-visible:ring-[1px] hover:border-ring/75 transition-all duration-100 ease-in"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={signupMutation.isPending}
          className="w-full cursor-pointer active:scale-95 transition-all duration-200 ease-in-out"
        >
          {signupMutation.isPending ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
