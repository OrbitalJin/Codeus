import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useLogin from "@/hooks/useLogin";
import Logo from "../Logo";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const { form, onSubmit, error } = useLogin();
  const user = auth.currentUser;
  console.log(user);
  if (user) {
    router.push("/");
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Form {...form}>
        <form
          className="flex flex-col p-10 py-20 space-y-5  rounded-md shadow-lg"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Logo className="text-5xl pb-2 self-center" />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Email" />
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
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Log in</Button>
          <Link
            href="/register"
            className="text-base text-muted transition-colors hover:text-primary"
          >
            Don&apos;t have an account yet? Register
          </Link>
        </form>
        {error && <a className="text-red-500">Wrong credentials</a>}
      </Form>
    </div>
  );
};

export default LoginForm;
