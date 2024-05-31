import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "@/services/postService";
import { PostModel } from "@/services/schema";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";
import { createPostFormSchema } from "@/services/validation";
import { z } from "zod";

export const useCreatePostForm = () => {
    const { toast } = useToast();
    const dialogCloseRef = useRef<HTMLButtonElement>(null);

    const form = useForm<z.infer<typeof createPostFormSchema>>({
        resolver: zodResolver(createPostFormSchema),
        defaultValues: {
            title: "",
            description: "",
            content: "",
            language: "go",
        },
    });

    const onSubmit = async (values: z.infer<typeof createPostFormSchema>) => {
        await createPost({ ...values, userId: "1" } as PostModel);
        if (dialogCloseRef.current) dialogCloseRef.current.click();

        toast({
            title: "Post created",
            description: "Your post has been created successfully!",
        });
    };

    return { form, onSubmit, dialogCloseRef };
};
