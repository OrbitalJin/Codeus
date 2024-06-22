import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginCredentialsSchema } from "@/services/validation";
import { useForm } from "react-hook-form";
import { useAuthenticate } from "./useAuthenticate";

const useLogin = () => {
  const { logIn, error, loading } = useAuthenticate();

  const form = useForm<z.infer<typeof loginCredentialsSchema>>({
    resolver: zodResolver(loginCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginCredentialsSchema>) => {
    await logIn(values.email, values.password);
  };

  return { form, onSubmit, loading, error };
};

export default useLogin;
