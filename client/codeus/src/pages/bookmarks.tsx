import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/contexts/auth-context";
import { useBookmarks } from "@/hooks/useBookmarked";
import { usePosts } from "@/hooks/usePosts";
import { clearUserBookmarks } from "@/services/bookmark-service";
import { PostModel } from "@/services/schema";
import { MoreHorizontal, Trash } from "lucide-react";
import { useContext } from "react";
import PageWrapper from "./page-wrapper";
import Banner from "./banner";
import PostList from "@/components/post/post-list";

const BookMarks: React.FC = () => {
  const { authState } = useContext(AuthContext);
  const { handleDelete } = usePosts();
  const { bookmarks, error, loading } = useBookmarks(
    authState.user?.id as string,
  );

  return (
    <PageWrapper>
      <Banner title="Bookmarks" back>
        <MoreButton userId={authState.user?.id as string} />
      </Banner>
      {bookmarks && bookmarks?.length > 0 ? (
        <PostList
          error={error}
          loading={loading}
          posts={bookmarks as PostModel[]}
          handleDelete={handleDelete}
        />
      ) : (
        <a className="self-center text-gray-400 text-sm p-10">No Bookmarks</a>
      )}
    </PageWrapper>
  );
};

type MoreButtonProps = {
  userId: string;
};

const MoreButton: React.FC<MoreButtonProps> = ({ userId }: MoreButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal
          size={35}
          className="cursor-pointer hover:bg-muted rounded-full transition-colors p-2"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            clearUserBookmarks(userId);
          }}
        >
          <Trash size={20} className="mr-2 text-red-500" />
          <a className="text-red-500">Clear Bookmarks</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BookMarks;
