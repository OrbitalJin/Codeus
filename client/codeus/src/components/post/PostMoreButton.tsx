import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Delete, Flag, MoreVertical, ShareIcon, Trash } from "lucide-react";

interface PostMoreButtonProps {
    postId: string;
    onDelete: (id: string) => void;
}

const PostMoreButton: React.FC<PostMoreButtonProps> = ({
    postId,
    onDelete,
}: PostMoreButtonProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVertical size={20} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                    <ShareIcon size={20} className="mr-2" /> Share
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <Flag size={20} className="mr-2" /> Report
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                        onDelete(postId);
                    }}
                >
                    <Trash size={20} className="mr-2 text-red-500" />
                    <span className="text-red-500">Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default PostMoreButton;
