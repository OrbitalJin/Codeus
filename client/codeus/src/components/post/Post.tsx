import { PostModel } from "@/lib/schema";
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

interface PostProps {
    post: PostModel;
}

export default function Post({ post }: PostProps) {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <PostUserHeader
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
                <PostInteractions />
            </CardFooter>
        </Card>
    );
}
