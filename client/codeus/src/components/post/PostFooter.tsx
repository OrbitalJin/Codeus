import { ArrowDown, ArrowUp, Bookmark, Copy } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import copy from "copy-to-clipboard";
import { PostModel } from "@/services/schema";
import { downvotePost, upvotePost } from "@/services/upvoteService";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context";

type PostInteractionsProps = {
  post: PostModel;
};

const PostFooter = ({ post }: PostInteractionsProps) => {
  const { authState } = useContext(AuthContext);
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-row space-x-3">
        <div
          className="group flex flex-row justify-between items-center p-1 space-x-2 shadow-sm bg-muted rounded-full cursor-pointer transition-all
          hover:shadow-md"
        >
          <ArrowUp
            size={25}
            className="cursor-pointer transition-all rounded-full hover:text-orange-500 p-1"
            onClick={() => {
              upvotePost(post.id as string, authState.user?.id as string);
            }}
          />
          <span className="text-xs text-primary">{post.voteCount}</span>
          <ArrowDown
            size={25}
            className="cursor-pointer transition-all rounded-full hover:text-blue-500 p-1"
            onClick={() => {
              downvotePost(post.id as string, authState.user?.id as string);
            }}
          />
        </div>

        <Badge
          variant="outline"
          className="shadow-sm transition-all hover:text-orange-500 hover:shadow-orange-500/25"
        >
          @{post.language}
        </Badge>
      </div>

      <div className="flex flex-row items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Copy
                onClick={() => {
                  copy(post.content);
                }}
                size={35}
                className="cursor-pointer transition-colors p-2 hover:text-indigo-500 hover:shadow-indigo-500/35"
              />
            </TooltipTrigger>
            <TooltipContent>Copy the snippet!</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Bookmark
                size={35}
                className="cursor-pointer transition-colors p-2 hover:text-indigo-500 hover:shadow-indigo-500/35"
              />
            </TooltipTrigger>
            <TooltipContent>Add to your Bookmarks</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PostFooter;
