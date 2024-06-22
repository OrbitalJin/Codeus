import { usePosts } from "@/hooks/usePosts";
import PostList from "./post-list";

const Feed = () => {
  const { loading, posts, error, handleDelete } = usePosts();

  return (
    <PostList
      posts={posts}
      handleDelete={handleDelete}
      loading={loading}
      error={error}
    />
  );
};

export default Feed;
