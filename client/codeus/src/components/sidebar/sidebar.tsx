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

  const shouldRender =
    location.pathname !== "/register" && location.pathname !== "/login";

  return (
    shouldRender && (
      <aside className="pl-60">
        <nav className="h-full flex flex-col border-r">
          <SidebarContext.Provider value={{ expanded, setExpanded }}>
            <SidebarHeader />
            <ul className="flex-1 px-3">
              <SideBarItem
                icon={<HomeIcon />}
                text="Home"
                active={false}
                onClick={() => {
                  navigate("/home");
                }}
              />
              <SideBarItem
                icon={<SearchIcon />}
                text="Explore"
                active={false}
              />

              <SideBarItem
                icon={<AtSignIcon />}
                text="Threads"
                active={false}
              />
              <SideBarItem
                icon={<PaperclipIcon />}
                text="Snippets"
                active={false}
              />

              <SideBarItem
                icon={<BookmarkIcon />}
                text="Bookmarks"
                active={false}
                onClick={() => {
                  navigate("/bookmarks");
                }}
              />
              <SideBarItem
                icon={<UserIcon />}
                text="Profile"
                active={false}
                onClick={() => {
                  navigate("/u/" + authState.user?.handle);
                }}
              />
            </ul>
            <CreatePostButton expanded={expanded} />
            <SidebarFooter />
          </SidebarContext.Provider>
        </nav>
      </aside>
    )
  );
};

export default Sidebar;
