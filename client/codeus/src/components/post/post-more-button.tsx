import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/contexts/auth-context";
import { PostModel } from "@/services/schema";
import { Flag, MoreHorizontal, ShareIcon, Trash } from "lucide-react";
import { useContext } from "react";

interface PostMoreButtonProps {
  post: PostModel;
  onDelete: (id: string) => void;
}

const PostMoreButton: React.FC<PostMoreButtonProps> = ({
  post,
  onDelete,
}: PostMoreButtonProps) => {
  const { authState } = useContext(AuthContext);

  const isAuthor: boolean = authState?.user?.id === post.authorId;

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
              onDelete(post.id as string);
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

export default PostMoreButton;
