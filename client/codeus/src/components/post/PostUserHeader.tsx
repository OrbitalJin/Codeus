import { PostModel, UserModel } from "@/services/schema";
import { fetchUser } from "@/services/userService";
import { useEffect, useState } from "react";
import PostMoreButton from "./PostMoreButton";

interface PostUserHeaderProps {
  post: PostModel;
  onDelete: (id: string) => void;
}

const PostUserHeader: React.FC<PostUserHeaderProps> = ({
  post,
  onDelete,
}: PostUserHeaderProps) => {
  const [author, setAuthor] = useState<UserModel | null>(null);

  useEffect(() => {
    (async () => {
      try {
        console.log(post.authorId);
        const fetchedAuthor = await fetchUser(post.authorId);
        setAuthor(fetchedAuthor);
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    })();
  }, [post]);

  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex items-center pb-1 cursor-pointer">
        <img
          src={"https://ui-avatars.com/api/?name=" + author?.username}
          alt=""
          width={30}
          height={30}
          className="w-6 h-6 rounded-full"
        />
        <div className="flex justify-between">
          <div className="flex mx-2 flex-row items-center space-x-2">
            <h4 className="text-sm font-semibold">
              {author ? author.username : "Deleted"}
            </h4>
            <span className="text-xs text-gray-400">
              /{author ? author.handle : "Deleted"}
            </span>
          </div>
        </div>
      </div>
      <PostMoreButton postId={post.id || ""} onDelete={onDelete} />
    </div>
  );
};

export default PostUserHeader;
