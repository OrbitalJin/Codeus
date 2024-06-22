import { AuthContext } from "@/contexts/auth-context";
import { useContext, useState } from "react";
import { Input } from "../ui/input";
import { SendHorizonal } from "lucide-react";
import { CommentModel, PostModel } from "@/services/schema";

type CommentInputProps = {
  post: PostModel;
  onCreate: (comment: CommentModel) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
  post,
  onCreate,
}: CommentInputProps) => {
  const { authState } = useContext(AuthContext);
  const [content, setContent] = useState<string>("");
  return (
    <div className="group flex flex-row items-center p-5 space-x-3 border-b-2 border-t-0">
      <img
        src={`https://ui-avatars.com/api/?name=${authState.user?.username}`}
        alt=""
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
      />
      <Input
        className="border-0"
        placeholder="Comment"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setContent(event.target.value);
        }}
      />
      <SendHorizonal
        className="group-hover:opacity-100 opacity-0 cursor-pointer transition-all hover:text-indigo-500"
        onClick={() => {
          if (content != "")
            onCreate({
              content: content,
              authorId: authState.user?.id as string,
              postId: post.id as string,
            });
        }}
      />
    </div>
  );
};

export default CommentInput;
