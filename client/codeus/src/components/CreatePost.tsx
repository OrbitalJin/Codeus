import {
    DialogTrigger,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import React, { useRef } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "./ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { createPost } from "@/services/postService";
import { PostModel } from "@/services/schema";
import { useToast } from "./ui/use-toast";

interface CreatePostProps {
    expanded: boolean;
}

const CreatePost: React.FC<CreatePostProps> = ({
    expanded,
}: CreatePostProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={`m-3 py-7 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-all ${
                        expanded ? "w-50" : "w-0 opacity-0"
                    }`}
                >
                    {expanded ? "Create Post" : ""}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                    <DialogDescription>
                        You will not be able to edit it later
                    </DialogDescription>
                </DialogHeader>
                <CreatePostForm />
            </DialogContent>
        </Dialog>
    );
};

export default CreatePost;

const formSchema = z.object({
    title: z
        .string({
            required_error: "Please enter a title",
        })
        .min(3)
        .max(100),
    description: z.string(),
    content: z.string().min(3),
    language: z.string({
        required_error: "Please select a language",
    }),
});

const CreatePostForm: React.FC = () => {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            content: "",
            language: "",
        },
    });

    // To close the dialog after successful submission
    const dialogCloseRef = useRef<HTMLButtonElement>(null);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await createPost({
            ...values,
            userId: "1",
        } as PostModel);

        // Close the dialog after successful submission
        if (dialogCloseRef.current) {
            dialogCloseRef.current.click();
        }

        // Show a success toast
        toast({
            title: "Post created",
            description: "Your post has been created successfully!",
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-3 w-full"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea placeholder="Content" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Languages</SelectLabel>
                                    <SelectItem value="python">
                                        Python
                                    </SelectItem>
                                    <SelectItem value="java">C++</SelectItem>
                                    <SelectItem value="javascript">
                                        TypeScript
                                    </SelectItem>
                                    <SelectItem value="go">Go</SelectItem>
                                    <SelectItem value="rust">Rust</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                <Button type="submit">Submit</Button>
                <DialogClose asChild>
                    <button ref={dialogCloseRef} style={{ display: "none" }} />
                </DialogClose>
            </form>
        </Form>
    );
};
