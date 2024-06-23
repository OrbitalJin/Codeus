import CommentService from "@/services/comment-service";
import { CommentModel } from "@/services/schema";
import { useEffect, useState } from "react";

const useUserComments = (id: string) => {
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const commentService = CommentService.getInstance();

  const handleDelete = async (id: string) => {
    try {
      await commentService.deleteComment(id);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error("Failed to delete comment", error);
      setError(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        setComments(await commentService.fetchUserComments(id));
      } catch (error) {
        console.log(error);
        setError(error ? true : false);
      }
    })();
    setLoading(false);
  }, [id, commentService]);

  return {
    comments,
    loading,
    error,
    handleDelete,
  };
};

export default useUserComments;
