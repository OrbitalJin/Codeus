import useEditProfile from "@/hooks/profile/useEditProfile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { UserModel } from "@/services/schema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { InfinitySpin } from "react-loader-spinner";

type EditProfileFormProps = {
  setOpen: (open: boolean) => void;
};

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  setOpen,
}: EditProfileFormProps) => {
  const { authState } = useContext(AuthContext);
  const { form, loading, onSubmit } = useEditProfile({
    user: authState.user as UserModel,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="username" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} placeholder="Bio"></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-indigo-500 text-secondary transition-all hover:bg-indigo-600"
            onClick={() => {
              setOpen(false);
            }}
          >
            {loading ? <InfinitySpin /> : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
