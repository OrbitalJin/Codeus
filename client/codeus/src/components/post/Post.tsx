import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CodeBlock, nord, obsidian, monokai, rainbow } from "react-code-blocks";
import PostUserHeader from "./PostUserHeader";
import PostFooter from "./PostFooter";
import { PostModel } from "@/services/schema";

interface PostProps {
  post: PostModel;
  onDelete: (id: string) => void;
}

export default function Post({ post, onDelete }: PostProps) {
  const theme = (() => {
    switch (post.theme) {
      case "nord":
        return nord;
      case "obsidian":
        return obsidian;
      case "monokai":
        return monokai;
      case "rainbow":
        return rainbow;
    }
    return nord;
  })();

  return (
    <Card className="shadow-sm rounded-none border-t-0 border-l-0 border-r-0 border-b-2 border-muted transition-colors cursor-pointer">
      <CardHeader>
        <PostUserHeader post={post} onDelete={onDelete} />
        <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <CodeBlock
          text={post.content}
          language={post.language}
          showLineNumbers={true}
          theme={theme}
        />
      </CardContent>
      <CardFooter>
        <PostFooter language={post.language} />
      </CardFooter>
    </Card>
  );
}
