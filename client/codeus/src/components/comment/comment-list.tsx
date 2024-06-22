import { InfinitySpin } from "react-loader-spinner";
import { CommentModel } from "@/services/schema";
import Comment from "./comment";

// I should consider using a context to avoid prop-drilling hte handleDelete function
// Or perhaps use a custom hook to handle the delete functionality
// Or a state management library like Redux or Recoil

type CommentListProps = {
  comments: CommentModel[];
  loading: boolean;
  error: boolean;
  handleDelete: (id: string) => Promise<void>;
};

const CommentList: React.FC<CommentListProps> = ({
  comments,
  loading,
  error,
  handleDelete,
}: CommentListProps) => {
  return (
    <div
      className={`flex-1 flex flex-col transition-all ${
        loading || comments == null ? "justify-center items-center" : ""
      }`}
    >
      {loading ? (
        <InfinitySpin color="grey" />
      ) : comments ? (
        comments.map((comment: CommentModel) => (
          <Comment key={comment.id} comment={comment} onDelete={handleDelete} />
        ))
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="p-1 text-center text-gray-400">
            {error ? "Failed to fetch comments :/" : "No comments found"}
          </h1>
        </div>
      )}
    </div>
  );
};

export default CommentList;
