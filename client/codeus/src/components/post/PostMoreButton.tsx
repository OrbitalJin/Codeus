import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flag, MoreVertical, ShareIcon } from "lucide-react";

const PostMoreButton = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVertical size={20} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <ShareIcon size={20} className="mr-2" /> Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Flag size={20} className="mr-2" /> Report
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default PostMoreButton;
