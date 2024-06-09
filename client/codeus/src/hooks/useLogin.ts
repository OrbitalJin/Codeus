import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userCredentialsSchema } from "@/services/validation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuthenticate } from "./useAuthenticate";

const useLogin = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { logIn } = useAuthenticate();

  const form = useForm<z.infer<typeof userCredentialsSchema>>({
    resolver: zodResolver(userCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userCredentialsSchema>) => {
    setLoading(true);
    const error = await logIn(values.email, values.password);
    setError(error ? true : false);
    setLoading(false);
  };

  return { form, onSubmit, loading, error };
};

export default useLogin;
