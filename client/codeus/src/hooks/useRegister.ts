import { useAuthenticate } from "./useAuthenticate";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerCredentialsSchema } from "@/services/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterPayload } from "@/services/schema";

const useRegister = () => {
  const { register, error, loading } = useAuthenticate();

  const form = useForm<z.infer<typeof registerCredentialsSchema>>({
    resolver: zodResolver(registerCredentialsSchema),
    defaultValues: {
      email: "epic@gamer.com",
      username: "Gamer",
      handle: "EpicGamer69",
      password: "password",
      confirmPassword: "password",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof registerCredentialsSchema>,
  ) => {
    console.log(values);
    await register(values as RegisterPayload);
  };

  return {
    form,
    loading,
    error,
    onSubmit,
  };
};
export default useRegister;
