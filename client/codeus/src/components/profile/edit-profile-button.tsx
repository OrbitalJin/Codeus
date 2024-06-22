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

type EditProfileButton = {
  className?: string;
  bio: string;
};

const EditProfileButton = ({ className }: EditProfileButton) => {
  const { handle } = useParams();
  const { authState } = useContext(AuthContext);
  const [open, setOpen] = useState<boolean>(false);

  const isVisible = authState.user?.handle === handle;

  return (
    isVisible && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogClose />
        <DialogTrigger asChild>
          <Button className={className} size="sm">
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
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
