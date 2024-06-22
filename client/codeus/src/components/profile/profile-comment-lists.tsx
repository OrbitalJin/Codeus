import useUserComments from "@/hooks/profile/useUserComments";
import CommentList from "../comment/comment-list";

type ProfileCommentListProps = {
  uid: string;
};

const ProfileCommentList: React.FC<ProfileCommentListProps> = (
  props: ProfileCommentListProps,
) => {
  const { loading, comments, handleDelete, error } = useUserComments(
    props?.uid,
  );

  return (
    <CommentList
      error={error}
      comments={comments}
      loading={loading}
      handleDelete={handleDelete}
    />
  );
};

export default ProfileCommentList;
