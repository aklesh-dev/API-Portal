import { useForm } from "react-hook-form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type Login } from "@/schema/Auth.schema";
import { useLogin } from "@/hooks/useHooks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function LoginForm() {
  const navigate = useNavigate()
  const loginMutation = useLogin();

  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  async function onSubmit(values: Login) {
    loginMutation.mutate(
      {
        username: values.username,
        password: values.password,
      },
      {
        onSuccess: () => {
          toast.success(`login success.`);
          navigate("/")
        },
        onError: (error) => {
          toast.error(`Login failed: ${error.message}`);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-sm mx-auto"
      >
        <h2 className="text-2xl font-bold"> Welcome 👋</h2>

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
          disabled={loginMutation.isPending}
          className="w-full cursor-pointer active:scale-95 transition-all duration-200 ease-in-out"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
