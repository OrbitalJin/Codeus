"use client";
import SideBar from "@/components/sidebar/Sidebar";
import {
    AtSignIcon,
    BookmarkIcon,
    HomeIcon,
    PaperclipIcon,
    SearchIcon,
    UserIcon,
} from "lucide-react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import SideBarItem from "@/components/sidebar/SidebarItem";
import PostList from "@/components/post/PostList";

export default function Home() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex flex-row h-screen">
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
                {/* Create a scrollable list of <Post /> components */}
                <main className="flex justify-center flex-1 overflow-y-auto">
                    <PostList />
                    <div className="grow border-l h-full "></div>
                </main>
            </div>
        </ThemeProvider>
    );
}
