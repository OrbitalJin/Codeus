import Image from "next/image";
import PostMoreButton from "./PostMoreButton";
import { PostModel, UserModel } from "@/services/schema";

interface PostUserHeaderProps {
    post: PostModel;
    user: UserModel;
    onDelete: (id: string) => void;
}

const PostUserHeader: React.FC<PostUserHeaderProps> = ({
    user,
    post,
    onDelete,
}: PostUserHeaderProps) => {
    return (
        <div className="flex flex-row justify-between items-center w-full">
            <div className="flex items-center pb-1 cursor-pointer">
                <Image
                    src="https://i.ibb.co/L6fNFqW/images.webp"
                    alt=""
                    width={30}
                    height={30}
                    className="w-6 h-6 rounded-full"
                />
                <div className="flex justify-between">
                    <div className="flex mx-2 flex-row items-center space-x-2">
                        <h4 className="text-sm font-semibold">
                            {user.username}
                        </h4>
                        <span className="text-xs text-gray-400">
                            /{user.id}
                        </span>
                    </div>
                </div>
            </div>
            <PostMoreButton postId={post.id} onDelete={onDelete} />
        </div>
    );
};

export default PostUserHeader;
