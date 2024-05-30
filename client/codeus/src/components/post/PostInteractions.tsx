import { ArrowDown, ArrowUp, Bookmark } from "lucide-react";

const PostInteractions = () => {
    return (
        <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row space-x-3">
                <div className="flex flex-row justify-between py-1 px-2 bg-muted rounded-full cursor-pointer hover:text-orange-500 transition-colors">
                    <ArrowUp size={15} className="cursor-pointer" />
                    <span className="text-xs text-gray-400">10</span>
                </div>
                <div className="flex flex-row justify-between py-1 px-2 bg-muted rounded-full cursor-pointer hover:text-blue-500 transition-colors">
                    <ArrowDown size={15} />
                    <span className="text-xs text-primary">10</span>
                </div>
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

export default PostInteractions;
