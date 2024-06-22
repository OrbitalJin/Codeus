import {
  DialogTrigger,
  DialogClose,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreatePostForm from "./create-post-form";

interface CreatePostProps {
  expanded: boolean;
}

const CreatePostButton: React.FC<CreatePostProps> = ({
  expanded,
}: CreatePostProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogClose />
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
        <CreatePostForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostButton;
