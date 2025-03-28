import { InfinitySpin } from "react-loader-spinner";
import { PostModel } from "@/services/schema";
import Post from "./post";

// I should consider using a context to avoid prop-drilling hte handleDelete function
// Or perhaps use a custom hook to handle the delete functionality
// Or a state management library like Redux or Recoil

type PostListProps = {
  posts: PostModel[];
  loading: boolean;
  error: boolean;
  handleDelete: (id: string) => Promise<void>;
};

const PostList = (props: PostListProps) => {
  return (
    <div
      className={`flex-1 flex flex-col bg-background transition-all ${
        props.loading || props.posts == null
          ? "justify-center items-center"
          : ""
      }`}
    >
      {props.loading ? (
        <InfinitySpin color="grey" />
      ) : props.posts ? (
        props.posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            clickable
            onDelete={props.handleDelete}
          />
        ))
      ) : (
        <h1 className="m-2 text-center  text-gray-400">
          {props.error ? "Failed to fetch posts :/" : "No comments found"}
        </h1>
      )}
    </div>
  );
};

export default PostList;
