import { deletePost } from "@/services/post-service";
import { PostModel } from "@/services/schema";
import { getUserUpvoted } from "@/services/upvote-service";
import { useEffect, useState } from "react";

export const useUpvotedPosts = (userId: string) => {
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
      setLoading(true);
      setPosts(await getUserUpvoted(userId));
      setLoading(false);
    })();
  }, [userId]);

  return {
    loading,
    posts,
    error,
    handleDelete,
  };
};
