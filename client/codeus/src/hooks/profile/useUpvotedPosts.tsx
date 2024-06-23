import PostService from "@/services/post-service";
import { PostModel } from "@/services/schema";
import VoteService from "@/services/vote-service";
import { useEffect, useState } from "react";

const useUpvotedPosts = (userId: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [error, setError] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    try {
      await PostService.getInstance().deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post", error);
      setError(true);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      setPosts(await VoteService.getInstance().getUserUpvoted(userId));
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

export default useUpvotedPosts;
