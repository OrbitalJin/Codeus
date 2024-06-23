import {
  ArrowDown,
  ArrowUp,
  Bookmark,
  Copy,
  MessageCircle,
  Share,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import copy from "copy-to-clipboard";
import { PostModel } from "@/services/schema";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context";
import useVotes from "@/hooks/post/useVotes";
import { useBookmark } from "@/hooks/useBookmarked";
import { useNavigate } from "react-router-dom";
import VoteService from "@/services/vote-service";

type PostInteractionsProps = {
  post: PostModel;
};

const PostFooter = ({ post }: PostInteractionsProps) => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const { bookMarked, toggleBookmark } = useBookmark(
    post.id as string,
    authState.user?.id as string,
  );
  const { upvoted, downvoted } = useVotes(
    post.id as string,
    authState.user?.id as string,
  );
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-row space-x-3">
        <div
          className="group flex flex-row justify-between items-center p-1 space-x-2 shadow-sm bg-muted rounded-full cursor-pointer transition-all
          hover:shadow-md"
        >
          <ArrowUp
            size={25}
            className={`cursor-pointer transition-all rounded-full p-1 ${upvoted ? "text-orange-500 hover:text-primary" : "text-primary hover:text-orange-500"}`}
            onClick={() => {
              VoteService.getInstance().upvotePost(
                post.id as string,
                authState.user?.id as string,
              );
            }}
          />
          <span className="text-xs text-primary">{post.voteCount}</span>
          <ArrowDown
            size={25}
            className={`cursor-pointer transition-all rounded-full p-1 ${downvoted ? "text-blue-500 hover:text-primary" : "text-primary hover:text-blue-500"}`}
            onClick={() => {
              VoteService.getInstance().downvotePost(
                post.id as string,
                authState.user?.id as string,
              );
            }}
          />
        </div>

        <div
          className="group flex flex-row justify-between items-center p-1 px-3 space-x-2 shadow-sm bg-muted rounded-full cursor-pointer transition-all
          hover:shadow-md"
          onClick={() => {
            navigate("/p/" + post.id);
          }}
        >
          <MessageCircle
            size={20}
            className="transition-all group-hover:text-indigo-500"
          />
          <a className="text-xs">{post.commentCount}</a>
        </div>
        <Badge
          variant="outline"
          className="shadow-sm transition-all hover:text-indigo-500 hover:shadow-indigo-500/25"
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
                className={`cursor-pointer transition-colors p-2 ${
                  bookMarked
                    ? "text-indigo-500 shadow-indigo-500/35 hover:text-primary"
                    : "hover:text-indigo-500 hover:shadow-indigo-500/35"
                }`}
                onClick={() => {
                  toggleBookmark(
                    post.id as string,
                    authState.user?.id as string,
                  );
                }}
              />
            </TooltipTrigger>
            <TooltipContent>Add to your Bookmarks</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Share
                onClick={() => {
                  copy("http://localhost:5173/p/" + post.id);
                }}
                size={35}
                className="cursor-pointer transition-colors p-2 hover:text-indigo-500 hover:shadow-indigo-500/35"
              />
            </TooltipTrigger>
            <TooltipContent>Share post!</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PostFooter;
