import PostList from "@/components/post/PostList";
import SideBar from "@/components/sidebar/Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/contexts/auth-context";
import { useBookmarks } from "@/hooks/useBookmarked";
import { usePosts } from "@/hooks/usePosts";
import { clearUserBookmarks } from "@/services/bookmarkService";
import { PostModel } from "@/services/schema";
import { MoreHorizontal, Trash } from "lucide-react";
import { useContext } from "react";

const BookMarks: React.FC = () => {
  const { authState } = useContext(AuthContext);
  const { handleDelete } = usePosts();
  const { bookmarks, error, loading } = useBookmarks(
    authState.user?.id as string,
  );

  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <main className="flex justify-center flex-1 overflow-y-auto">
        <div className="flex-1 flex flex-col">
          <div
            id="banner"
            className="flex flex-row items-center px-2 shadow-sm sticky top-0 z-10 backdrop-blur-lg"
          >
            <a className="font-bold text-xl p-5">Bookmarks</a>
            <a className="text-sm text-gray-400">/{authState.user?.handle}</a>
            <div className="grow" />
            <MoreButton userId={authState.user?.id as string} />
          </div>
          {bookmarks && bookmarks?.length > 0 ? (
            <PostList
              error={error}
              loading={loading}
              posts={bookmarks as PostModel[]}
              handleDelete={handleDelete}
            />
          ) : (
            <a className="self-center text-gray-400 text-sm p-10">
              No Bookmarks
            </a>
          )}
        </div>
        <div className="grow border-l h-full" />
      </main>
    </div>
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
