import { InfinitySpin } from "react-loader-spinner";
import { usePosts } from "@/hooks/usePosts";
import Post from "./Post";

// I should consider using a context to avoid prop-drilling hte handleDelete function
// Or perhaps use a custom hook to handle the delete functionality
// Or a state management library like Redux or Recoil

const PostList = () => {
  const { loading, posts, error, handleDelete } = usePosts();

  return (
    <div
      className={`flex-1 flex flex-col transition-all ${loading || posts == null ? "justify-center items-center" : ""
        }`}
    >
      {loading ? (
        <InfinitySpin color="grey" />
      ) : posts ? (
        posts.map((post) => (
          <Post key={post.id} post={post} onDelete={handleDelete} />
        ))
      ) : (
        <h1 className="text-center  text-gray-400">
          {error ? "Failed to fetch posts :/" : "No posts found"}
        </h1>
      )}
    </div>
  );
};

export default PostList;
