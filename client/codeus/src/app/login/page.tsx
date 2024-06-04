"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebase";
import { userCredentialsSchema } from "@/services/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Login = () => {
  const [logIn] = useSignInWithEmailAndPassword(auth);

  const form = useForm<z.infer<typeof userCredentialsSchema>>({
    resolver: zodResolver(userCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userCredentialsSchema>) => {
    //await createPost({ ...values, userId: "1" } as PostModel);
    //if (dialogCloseRef.current) dialogCloseRef.current.click();
    console.log(values);
    const res = await logIn(values.email, values.password);
    console.log(res);
    toast({
      title: "Post created",
      description: "Your post has been created successfully!",
    });
  };
  return (
    <div>
      Login
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
        </form>
      </Form>
    </div>
  );
};
export default Login;
