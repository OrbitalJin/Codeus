import useFetchUserByHandle from "@/hooks/auth/useFetchUserByHandle";

type UserPreviewProps = {
  handle: string;
};

const UserPreview = ({ handle }: UserPreviewProps) => {
  const user = useFetchUserByHandle(handle);

  return (
    <div className="flex flex-col ">
      <a>{user?.username}</a>
      <a>{user?.handle}</a>
      <a>{user?.email}</a>
    </div>
  );
};

export default UserPreview;
