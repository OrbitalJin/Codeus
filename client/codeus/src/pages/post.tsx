import { useParams } from "react-router-dom";
import PageWrapper from "./page-wrapper";
import PostComponent from "@/components/post/PostComponent";
import usePost from "@/hooks/usePost";
import { InfinitySpin } from "react-loader-spinner";
import Banner from "./banner";

const Post = () => {
  const { postId } = useParams();
  const { loading, post, handleDelete } = usePost(postId as string);
  return (
    <PageWrapper>
      <Banner title="Post" back />

      {loading ? (
        <InfinitySpin />
      ) : (
        post && <PostComponent post={post} onDelete={handleDelete} />
      )}
    </PageWrapper>
  );
};

export default Post;
