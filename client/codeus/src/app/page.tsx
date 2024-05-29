import SideBar from "@/components/Sidebar/Sidebar";
import {
    AtSignIcon,
    BookmarkIcon,
    HomeIcon,
    PaperclipIcon,
    SearchIcon,
    UserIcon,
} from "lucide-react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import SideBarItem from "@/components/Sidebar/SidebarItem";

export default function Home() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex flex-row">
                <SideBar
                    sidebarFooter={{
                        image: "https://i.ibb.co/L6fNFqW/images.webp",
                        displayName: "Witow Kiwi",
                        handle: "@bunimawl",
                    }}
                >
                    <SideBarItem
                        icon={<HomeIcon />}
                        text="Home"
                        active={false}
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
                    />
                    <SideBarItem
                        icon={<UserIcon />}
                        text="Profile"
                        active={false}
                    />
                </SideBar>
                <main className="flex justify-between"></main>
            </div>
        </ThemeProvider>
    );
}
