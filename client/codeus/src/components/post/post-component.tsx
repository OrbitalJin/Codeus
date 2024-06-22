import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CodeBlock, nord, obsidian, monokai, rainbow } from "react-code-blocks";
import PostFooter from "./post-footer";
import PostHeader from "./post-header";
import { PostModel } from "@/services/schema";
import { useNavigate } from "react-router-dom";

interface PostProps {
  post: PostModel;
  clickable?: boolean;
  onDelete: (id: string) => void;
}

export default function PostComponent({
  post,
  clickable,
  onDelete: onDelete,
}: PostProps) {
  const navigate = useNavigate();
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
    <Card
      className={`shadow-sm rounded-none border-t-0 border-l-0 border-r-0 border-b-2 border-muted transition-colors ${
        clickable ? "hover:bg-muted" : ""
      }`}
    >
      <div className={`${clickable ? "cursor-pointer" : ""}`}>
        <CardHeader>
          <PostHeader post={post} onDelete={onDelete} />
          <div
            onClick={() => {
              clickable && navigate("/p/" + post.id);
            }}
          >
            <CardTitle className="text-lg font-semibold">
              {post.title}
            </CardTitle>
            <CardDescription>{post.description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent
          onClick={() => {
            clickable && navigate("/p/" + post.id);
          }}
        >
          <CodeBlock
            text={post.content}
            language={post.language}
            showLineNumbers={true}
            theme={theme}
          />
        </CardContent>
      </div>
      <CardFooter>
        <PostFooter post={post} />
      </CardFooter>
    </Card>
  );
}
