import { PostModel } from "@/services/schema";
import PostMoreButton from "./PostMoreButton";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/tooltip";
import UserPreview from "../user/UserPreview";
import useFetchUserById from "@/hooks/useFetchUserById";

interface PostUserHeaderProps {
  post: PostModel;
  onDelete: (id: string) => void;
}

const PostUserHeader: React.FC<PostUserHeaderProps> = ({
  post,
  onDelete,
}: PostUserHeaderProps) => {
  const author = useFetchUserById(post.authorId);
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-between items-center w-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={() => {
                navigate("/u/" + author?.handle);
              }}
              className="flex items-center rounded-full pb-1 cursor-pointer"
            >
              <img
                src={"https://ui-avatars.com/api/?name=" + author?.username}
                alt=""
                width={30}
                height={30}
                className="w-6 h-6 rounded-full"
              />
              <div className="flex justify-between">
                <div className="flex mx-2 flex-row items-center space-x-2">
                  <h4 className="text-sm font-semibold">
                    {author ? author.username : "Deleted"}
                  </h4>
                  <span className="text-xs text-gray-400">
                    /{author ? author.handle : "Deleted"}
                  </span>
                </div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <UserPreview handle={author?.handle as string} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PostMoreButton postId={post.id || ""} onDelete={onDelete} />
    </div>
  );
};

export default PostUserHeader;
