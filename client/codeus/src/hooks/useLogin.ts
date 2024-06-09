import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userCredentialsSchema } from "@/services/validation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userCredentialsSchema>>({
    resolver: zodResolver(userCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userCredentialsSchema>) => {
    console.log(values);
    setLoading(true);
    setError(false);
    navigate("/");
  };

  return { form, onSubmit, loading, error };
};

export default useLogin;
