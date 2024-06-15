import { useEffect, useState } from "react";
import { PostModel } from "@/services/schema";
import {
  deletePost,
  fetchPosts,
  fetchPostsByAuthorId,
} from "@/services/postService";

export const usePosts = (id?: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [error, setError] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post", error);
      setError(true);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = id ? await fetchPostsByAuthorId(id) : await fetchPosts();
        setPosts(data.reverse());
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setError(true);
      }
      setLoading(false);
    })();
  }, [id]);

  return {
    loading,
    posts,
    error,
    handleDelete,
  };
};
