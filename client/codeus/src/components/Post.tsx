import PostModel from "@/models/Post";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

import { CodeBlock, nord } from "react-code-blocks";

interface PostProps {
    post: PostModel;
}

const Post: React.FC<PostProps> = ({ post }: PostProps) => {
    console.log(post);
    return (
        <Card>
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>u/{post.userId}</CardDescription>
                <CardContent>
                    {post.description}
                    <CodeBlock
                        text={post.content}
                        language={post.language}
                        showLineNumbers={true}
                        theme={nord}
                    />
                </CardContent>
            </CardHeader>
        </Card>
    );
};

export default Post;
