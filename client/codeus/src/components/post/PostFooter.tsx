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

type PostInteractionsProps = {
  post: PostModel;
};

const PostFooter = ({ post }: PostInteractionsProps) => {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-row space-x-3">
        <div
          className="flex flex-row justify-between py-1 px-2 shadow-sm bg-muted rounded-full cursor-pointer transition-all
          hover:shadow-orange-500/25
          hover:shadow-md
          hover:text-orange-500"
        >
          <ArrowUp size={15} className="cursor-pointer" />
          <span className="text-xs text-primary">10</span>
        </div>
        <div
          className="flex flex-row justify-between py-1 px-2 shadow-sm bg-muted rounded-full cursor-pointer transition-all 
          hover:shadow-blue-500/25
          hover:shadow-md
          hover:text-blue-500"
        >
          <ArrowDown size={15} />
          <span className="text-xs text-primary">10</span>
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
