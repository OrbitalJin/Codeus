import { UserModel } from "@/lib/schema";
import Image from "next/image";
import PostMoreButton from "./PostMoreButton";

const PostUserHeader: React.FC<UserModel> = ({ id, username }: UserModel) => {
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
                        <h4 className="text-sm font-semibold">{username}</h4>
                        <span className="text-xs text-gray-400">/{id}</span>
                    </div>
                </div>
            </div>
            <PostMoreButton />
        </div>
    );
};

export default PostUserHeader;
