import { PostModel } from "@/services/schema";
import PostMoreButton from "./post-more-button";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/tooltip";
import UserPreview from "../user/user-preview-tooltip";
import useFetchUserById from "@/hooks/auth/useFetchUserById";
import moment from "moment";

interface PostHeaderProps {
  post: PostModel;
  onDelete: (id: string) => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  post,
  onDelete,
}: PostHeaderProps) => {
  const author = useFetchUserById(post.authorId);
  const navigate = useNavigate();

  const relativeTime = moment(post.createdAt).fromNow();

  return (
    <div className="flex flex-row justify-between items-center w-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className="flex items-center rounded-full hover:p-1 cursor-pointer transition-all hover:bg-muted"
              onClick={() => {
                navigate("/u/" + author?.handle);
              }}
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
                  <span className="text-xs text-gray-400">{relativeTime}</span>
                </div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <UserPreview handle={author?.handle as string} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PostMoreButton post={post} onDelete={onDelete} />
    </div>
  );
};

export default PostHeader;
