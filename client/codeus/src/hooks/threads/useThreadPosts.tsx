import PostService from "@/services/post-service";
import { PostModel } from "@/services/schema";
import { useEffect, useState } from "react";

const service: PostService = PostService.getInstance();

const useThreadPosts = (threadId: string) => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleDelete = async (postId: string) => {
    await service.deletePost(postId);
    setPosts(posts.filter((post: PostModel) => post.id != postId));
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const fetchedPosts = await service.fetchPostsByThreadId(threadId);
        setPosts(fetchedPosts.reverse());
      } catch (error) {
        setError(error ? true : false);
      }
    })();
    setLoading(false);
  }, [threadId]);

  return {
    loading,
    posts,
    error,
    handleDelete,
  };
};

export default useThreadPosts;
