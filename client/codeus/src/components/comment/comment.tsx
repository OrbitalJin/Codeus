import { Card, CardContent, CardHeader } from "../ui/card";
import { CommentModel } from "@/services/schema";
import CommentHeader from "./comment-header";
import { useNavigate } from "react-router-dom";

interface CommentProps {
  comment: CommentModel;
  onDelete: (id: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  onDelete,
}: CommentProps) => {
  const navigate = useNavigate();
  return (
    <Card
      className="shadow-sm rounded-none hover:bg-muted 
          border-t-0 border-l-0 border-r-0 border-b-2 border-muted transition-colors"
    >
      <CardHeader>
        <CommentHeader comment={comment} onDelete={onDelete} />
      </CardHeader>
      <CardContent
        className="cursor-pointer"
        onClick={() => {
          navigate("/p/" + comment.postId);
        }}
      >
        <p>{comment.content}</p>
      </CardContent>
    </Card>
  );
};
export default Comment;
