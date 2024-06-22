import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "@/services/post-service";
import { PostModel } from "@/services/schema";
import { useContext } from "react";
import { createPostFormSchema } from "@/services/validation";
import { z } from "zod";
import { AuthContext } from "@/contexts/auth-context";

export const useCreatePostForm = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;

  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      theme: "nord",
      language: "go",
    },
  });

  const onSubmit = async (values: z.infer<typeof createPostFormSchema>) => {
    await createPost({ ...values, authorId: user?.id } as PostModel);
  };

  return { form, onSubmit };
};
