import { useParams } from "react-router-dom";
import PageWrapper from "./page-wrapper";
import Post from "@/components/post/PostComponent";
import usePost from "@/hooks/usePost";
import { InfinitySpin } from "react-loader-spinner";
import Banner from "./banner";

const PostPage = () => {
  const { postId } = useParams();
  const { loading, post, handleDelete } = usePost(postId as string);
  return (
    <PageWrapper>
      <Banner title="Post" back />

      {loading ? (
        <InfinitySpin />
      ) : (
        post && (
          <div className="flex flex-col">
            <Post post={post} onDelete={handleDelete} />
            <div>hello</div>
          </div>
        )
      )}
    </PageWrapper>
  );
};

export default PostPage;
