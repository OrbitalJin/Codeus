import { ArrowDown, ArrowUp, Bookmark } from "lucide-react";
import { Badge } from "../ui/badge";

type PostInteractionsProps = {
  language: string;
};

const PostFooter = ({ language }: PostInteractionsProps) => {
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
          @{language}
        </Badge>
      </div>

      <div className="hover:text-blue-500">
        <Bookmark
          size={15}
          className="cursor-pointer transition-colors rounded-full"
        />
      </div>
    </div>
  );
};

export default PostFooter;
