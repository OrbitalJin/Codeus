import {
    DialogTrigger,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import CreatePostForm from "./CreatePostForm";

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
