import PostList from "../post/post-list";
import { useUpvotedPosts } from "@/hooks/useUpvotedPosts";

type ProfileUpvotedPostListProps = {
  uid: string;
};

const ProfileUpvotedPostList: React.FC<ProfileUpvotedPostListProps> = (
  props: ProfileUpvotedPostListProps,
) => {
  const { loading, posts, error, handleDelete } = useUpvotedPosts(props?.uid);

  return (
    <PostList
      error={error}
      posts={posts}
      loading={loading}
      handleDelete={handleDelete}
    />
  );
};

export default ProfileUpvotedPostList;
