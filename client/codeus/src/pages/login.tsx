import { LoaderIcon } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import useLogin from "@/hooks/useLogin";

const Login = () => {
  const { form, onSubmit, loading, error } = useLogin();

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <ModeToggle className="absolute top-4 right-4" />
      <div className="flex flex-col text-center justify-center items-center h-screen">
        <Form {...form}>
          <form
            className="flex flex-col p-14 space-y-5  rounded-md shadow-md"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Logo className="text-6xl self-center" />
            <div className="text-lg pb-5 text-gray-600">
              <TypeAnimation
                sequence={[
                  "Where Developers Code.",
                  1000,
                  "Where Developers Connect.",
                  1000,
                  "Where Developers Share.",
                ]}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Email" className="h-15:" />
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
            <Button type="submit">{loading ? <LoaderIcon /> : "Log in"}</Button>
            <a
              href="/register"
              className="text-base text-center text-gray-500 transition-colors hover:text-primary"
            >
              Don&apos;t have an account? Signup
            </a>
          </form>
          {error ? <a className="text-red-500">Wrong credentials</a> : null}
        </Form>
        <div className="absolute -z-10 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>
    </div>
  );
};

export default Login;
