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
import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { PostModel } from "@/lib/schema";
import { InfinitySpin } from "react-loader-spinner";

export default function Home() {
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("http://localhost:8080/posts/")
            .then(res => res.json())
            .then(data => setPosts(data?.data));
        setLoading(false);
    }, []);

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
                    <div
                        className={`flex-1 flex flex-col p-5 space-y-3 transition-all ${
                            loading ? "justify-center items-center" : ""
                        }`}
                    >
                        {loading ? (
                            <InfinitySpin color="grey" />
                        ) : (
                            posts.map((post: PostModel) => (
                                <Post key={post.id} post={post} />
                            ))
                        )}
                    </div>
                    <div className="grow border-l h-full "></div>
                </main>
            </div>
        </ThemeProvider>
    );
}
