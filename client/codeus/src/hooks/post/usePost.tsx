import PostService from "@/services/post-service";
import { PostModel } from "@/services/schema";
import { useEffect, useState } from "react";

const usePost = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<PostModel | null>(null);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await PostService.getInstance().deletePost(id);
      setPost(null);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    (async (id: string) => {
      setPost(await PostService.getInstance().fetchPost(id as string));
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
