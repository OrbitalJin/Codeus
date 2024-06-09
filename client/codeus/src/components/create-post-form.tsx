import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useCreatePostForm } from "@/hooks/useCreatePostForm";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

const CreatePostForm: React.FC = () => {
  const { form, onSubmit, dialogCloseRef } = useCreatePostForm();

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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">C++</SelectItem>
                  <SelectItem value="javascript">TypeScript</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <Button
          type="submit"
          className="bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
        >
          Post
        </Button>
        <DialogClose asChild>
          <button ref={dialogCloseRef} style={{ display: "none" }} />
        </DialogClose>
      </form>
    </Form>
  );
};

export default CreatePostForm;
