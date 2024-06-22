import { useEffect, useState } from "react";
import { CommentModel } from "@/services/schema";
import {
  createComment,
  deleteComment,
  fetchComments,
} from "@/services/comment-service";

const useComments = (postId: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [error, setError] = useState<boolean>(false);

  const handleCreate = async (comment: CommentModel) => {
    console.log(comment);
    try {
      await createComment(comment);
      setComments([...comments, comment]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteComment(id);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error("Failed to delete comment", error);
      setError(true);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setComments((await fetchComments(postId)).reverse());
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setError(true);
      }
      setLoading(false);
    })();
  }, [postId]);

  return {
    loading,
    comments,
    error,
    handleCreate,
    handleDelete,
  };
};

export default useComments;
