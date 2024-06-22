import { useParams } from "react-router-dom";
import PageWrapper from "./page-wrapper";
import PostComponent from "@/components/post/post-component";
import { InfinitySpin } from "react-loader-spinner";
import Banner from "./banner";
import CommentInput from "@/components/comment/comment-input";
import CommentList from "@/components/comment/comment-list";
import useComments from "@/hooks/post/useComments";
import usePost from "@/hooks/post/usePost";

const PostPage = () => {
  const { postId } = useParams();
  const { loading, post, handleDelete } = usePost(postId as string);
  const commentsProps = useComments(postId as string);
  return (
    <PageWrapper>
      <Banner title="Post" back />

      {loading ? (
        <InfinitySpin />
      ) : (
        post && (
          <div className="flex flex-col">
            <PostComponent post={post} onDelete={handleDelete} />
            <CommentInput post={post} onCreate={commentsProps.handleCreate} />
            <CommentList {...commentsProps} />
          </div>
        )
      )}
    </PageWrapper>
  );
};

export default PostPage;
