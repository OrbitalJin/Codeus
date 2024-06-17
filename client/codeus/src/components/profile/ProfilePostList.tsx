import PostList from "@/components/post/PostList";
import { usePosts } from "@/hooks/usePosts";

type ProfilePostListProps = {
  uid: string;
};

const ProfilePostList: React.FC<ProfilePostListProps> = (
  props: ProfilePostListProps,
) => {
  const { error, loading, posts, handleDelete } = usePosts(props?.uid);

  return (
    <PostList
      posts={posts}
      error={error}
      loading={loading}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePostList;
