import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { CodeBlock, nord } from "react-code-blocks";
import PostUserHeader from "./PostUserHeader";
import PostInteractions from "./PostInteractions";
import { PostModel } from "@/services/schema";

interface PostProps {
    post: PostModel;
    onDelete: (id: string) => void;
}

export default function Post({ post, onDelete }: PostProps) {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <PostUserHeader
                    post={post}
                    user={{
                        id: post.userId,
                        username: "John Doe",
                    }}
                    onDelete={onDelete}
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
                <PostInteractions />
            </CardFooter>
        </Card>
    );
}
