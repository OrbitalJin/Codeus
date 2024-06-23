import { useContext, useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  AtSignIcon,
  PaperclipIcon,
  BookmarkIcon,
  UserIcon,
} from "lucide-react";
import SidebarHeader from "./sidebar-header";
import SidebarFooter from "./sidebar-footer";
import SideBarItem from "./sidebar-item";
import CreatePostButton from "../post/create-post-button";
import { SidebarContext } from "@/contexts/sidebar-context";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/auth-context";

const Sidebar = () => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Define paths for each sidebar item
  const paths = {
    home: "/home",
    explore: "/explore",
    threads: "/threads",
    snippets: "/snippets",
    bookmarks: "/bookmarks",
    profile: `/u/${authState.user?.handle}`,
  };

  // Determine if the current location matches the path
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="pl-60">
      <nav className="h-full flex flex-col border-r">
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
          <SidebarHeader />
          <ul className="flex-1 px-3">
            <SideBarItem
              icon={<HomeIcon />}
              text="Home"
              active={isActive(paths.home)}
              onClick={() => {
                navigate(paths.home);
              }}
            />
            <SideBarItem
              icon={<SearchIcon />}
              text="Explore"
              active={isActive(paths.explore)}
              onClick={() => {
                navigate(paths.explore);
              }}
            />
            <SideBarItem
              icon={<AtSignIcon />}
              text="Threads"
              active={isActive(paths.threads)}
              onClick={() => {
                navigate(paths.threads);
              }}
            />
            <SideBarItem
              icon={<PaperclipIcon />}
              text="Snippets"
              active={isActive(paths.snippets)}
              onClick={() => {
                navigate(paths.snippets);
              }}
            />
            <SideBarItem
              icon={<BookmarkIcon />}
              text="Bookmarks"
              active={isActive(paths.bookmarks)}
              onClick={() => {
                navigate(paths.bookmarks);
              }}
            />
            <SideBarItem
              icon={<UserIcon />}
              text="Profile"
              active={isActive(paths.profile)}
              onClick={() => {
                navigate(paths.profile);
              }}
            />
          </ul>
          <CreatePostButton expanded={expanded} />
          <SidebarFooter />
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

export default Sidebar;
