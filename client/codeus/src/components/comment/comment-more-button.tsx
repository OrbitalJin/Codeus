import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/contexts/auth-context";
import { CommentModel } from "@/services/schema";
import { Flag, MoreHorizontal, ShareIcon, Trash } from "lucide-react";
import { useContext } from "react";

interface CommentMoreButtonProps {
  comment: CommentModel;
  onDelete: (id: string) => void;
}

const CommentMoreButton: React.FC<CommentMoreButtonProps> = ({
  comment,
  onDelete,
}: CommentMoreButtonProps) => {
  const { authState } = useContext(AuthContext);

  const isAuthor: boolean = authState?.user?.id === comment.authorId;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal
          size={35}
          className="cursor-pointer hover:bg-muted rounded-full transition-colors p-2"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer">
          <ShareIcon size={20} className="mr-2" /> Share
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Flag size={20} className="mr-2" /> Report
        </DropdownMenuItem>
        {isAuthor && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              onDelete(comment.id as string);
            }}
          >
            <Trash size={20} className="mr-2 text-red-500" />
            <span className="text-red-500">Delete</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentMoreButton;
