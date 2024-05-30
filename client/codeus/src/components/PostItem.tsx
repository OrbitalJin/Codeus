import { Post, User } from "@/lib/schema";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { CodeBlock, nord } from "react-code-blocks";
import Image from "next/image";
import {
    ArrowDown,
    ArrowUp,
    Blocks,
    BlocksIcon,
    Bookmark,
    MoreVertical,
    Share,
    ShareIcon,
} from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface PostProps {
    post: Post;
}

export default function PostItem({ post }: PostProps) {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <UserHeader
                    {...{
                        id: post.userId,
                        username: "John Doe",
                    }}
                />
                <CardTitle className="text-lg font-semibold">
                    {post.title}
                </CardTitle>
                <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <CodeBlock
                    text={post.content}
                    language={post.language}
                    showLineNumbers={true}
                    theme={nord}
                />
            </CardContent>
            <CardFooter>
                <CardInteractions />
            </CardFooter>
        </Card>
    );
}

const UserHeader: React.FC<User> = ({ id, username }: User) => {
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
            <MoreButton />
        </div>
    );
};

const MoreButton = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreVertical size={20} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <ShareIcon size={20} className="mr-2" /> Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <BlocksIcon size={20} className="mr-2" /> Report
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const CardInteractions = () => {
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
