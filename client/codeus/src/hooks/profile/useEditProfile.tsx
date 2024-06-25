import { useForm } from "react-hook-form";
import { editProfileSchema } from "@/services/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserModel } from "@/services/schema";
import { useState } from "react";
import UserService from "@/services/user-service";

type useEditProfileProps = {
  user: UserModel;
  setBio: (bio: string) => void;
};

const useEditProfile = ({ user, setBio }: useEditProfileProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user.username,
      bio: user.bio,
    },
  });

  const onSubmit = async (values: z.infer<typeof editProfileSchema>) => {
    setLoading(true);
    await UserService.getInstance().updateUser({
      ...user,
      bio: values.bio,
      username: values.username,
    });
    setBio(values.bio);
    setLoading(false);
  };
  return {
    form,
    loading,
    onSubmit,
  };
};

export default useEditProfile;
