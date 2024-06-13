import SideBarItem from "@/components/sidebar/SidebarItem";
import SideBar from "@/components/sidebar/Sidebar";
import {
  HomeIcon,
  SearchIcon,
  AtSignIcon,
  PaperclipIcon,
  BookmarkIcon,
  UserIcon,
} from "lucide-react";
import PostList from "@/components/post/PostList";
function Home() {
  return (
    <div className="flex flex-row h-screen">
      <SideBar>
        <SideBarItem icon={<HomeIcon />} text="Home" active={false} />
        <SideBarItem icon={<SearchIcon />} text="Explore" active={false} />

        <SideBarItem icon={<AtSignIcon />} text="Threads" active={false} />
        <SideBarItem icon={<PaperclipIcon />} text="Snippets" active={false} />

        <SideBarItem icon={<BookmarkIcon />} text="Bookmarks" active={false} />
        <SideBarItem icon={<UserIcon />} text="Profile" active={false} />
      </SideBar>
      {/* Create a scrollable list of <Post /> components */}
      <main className="flex justify-center flex-1 overflow-y-auto">
        <PostList />
        <div className="grow border-l h-full "></div>
      </main>
    </div>
  );
}

export default Home;
