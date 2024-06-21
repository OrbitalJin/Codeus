import { deletePost, fetchPost } from "@/services/postService";
import { PostModel } from "@/services/schema";
import { useEffect, useState } from "react";

const usePost = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<PostModel | null>(null);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deletePost(id);
      setPost(null);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    (async (id: string) => {
      setPost(await fetchPost(id as string));
    })(id);
    setLoading(false);
  }, [id]);

  return {
    loading,
    post,
    handleDelete,
  };
};

export default usePost;
