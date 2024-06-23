import { useEffect, useState } from "react";
import { PostModel } from "@/services/schema";
import PostService from "@/services/post-service";

const usePosts = (id?: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [error, setError] = useState<boolean>(false);
  const postService = PostService.getInstance();

  const handleCreate = async (post: PostModel) => {
    try {
      setPosts([...posts, await postService.createPost(post)]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await postService.deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post", error);
      setError(true);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = id
          ? await postService.fetchPostsByAuthorId(id)
          : await postService.fetchPosts();
        setPosts(data.reverse());
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setError(true);
      }
      setLoading(false);
    })();
  }, [id, postService]);

  return {
    loading,
    posts,
    error,
    handleCreate,
    handleDelete,
  };
};

export default usePosts;
