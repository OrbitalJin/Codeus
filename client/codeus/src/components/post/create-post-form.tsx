import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreatePostForm } from "@/hooks/post/useCreatePostForm";
import { Button } from "@/components/ui/button";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useState } from "react";

type CreatePostFormProps = {
  setOpen: (open: boolean) => void;
};

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  setOpen,
}: CreatePostFormProps) => {
  const { form, onSubmit } = useCreatePostForm();
  const [lang, setLang] = useState<string>("go");

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
                <CodeEditor
                  {...field}
                  className="rounded-md text-sm"
                  language={lang}
                  placeholder={`Please enter ${lang} code.`}
                  padding={15}
                  style={{
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row space-x-2">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <Select
                onValueChange={(value: string) => {
                  field.onChange(value);
                  setLang(value);
                }}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Themes</SelectLabel>
                    <SelectItem value="nord">Nord</SelectItem>
                    <SelectItem value="dracula">Dracula</SelectItem>
                    <SelectItem value="obsidian">Obsidian</SelectItem>
                    <SelectItem value="rainbow">Rainbow</SelectItem>
                    <SelectItem value="monokai">Monokai</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <Button
          type="submit"
          className="bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
          onClick={() => {
            setOpen(false);
          }}
        >
          Post
        </Button>
      </form>
    </Form>
  );
};

export default CreatePostForm;
