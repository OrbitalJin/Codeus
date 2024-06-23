import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/auth-context";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import EditProfileForm from "./edit-profile-form";
import Logo from "../logo";

const EditProfileButton = () => {
  const { handle } = useParams();
  const { authState } = useContext(AuthContext);
  const [open, setOpen] = useState<boolean>(false);

  const isVisible = authState.user?.handle === handle;

  return (
    isVisible && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogClose />
        <DialogTrigger asChild>
          <Button
            className="bg-indigo-500 hover:bg-indigo-600 text-white"
            size="sm"
          >
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <Logo className="self-center text-3xl" />
            <DialogTitle>Edit</DialogTitle>
            <DialogDescription>Edit your profile</DialogDescription>
          </DialogHeader>
          <EditProfileForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    )
  );
};

export default EditProfileButton;
