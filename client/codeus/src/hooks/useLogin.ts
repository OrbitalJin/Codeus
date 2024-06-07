import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { userCredentialsSchema } from "@/services/validation";
import { useForm } from "react-hook-form";
import { auth } from "@/lib/firebase";
import { useState } from "react";

const useLogin = () => {
  const [logIn] = useSignInWithEmailAndPassword(auth);
  const [error, setError] = useState<boolean>(false);

  const form = useForm<z.infer<typeof userCredentialsSchema>>({
    resolver: zodResolver(userCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userCredentialsSchema>) => {
    console.log(values);
    const res = await logIn(values.email, values.password);
    console.log(res);
    setError(res ? false : true);
  };

  return { form, onSubmit, error };
};

export default useLogin;
