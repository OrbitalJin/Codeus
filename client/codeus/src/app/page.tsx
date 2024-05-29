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
                        image: "https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true",
                        displayName: "John Doe",
                        handle: "@johndoe",
                    }}
                >
                    <SideBarItem
                        icon={<HomeIcon />}
                        text="Home"
                        alert={true}
                        active={false}
                    />
                    <SideBarItem
                        icon={<SearchIcon />}
                        text="Explore"
                        alert={false}
                        active={false}
                    />

                    <SideBarItem
                        icon={<AtSignIcon />}
                        text="Threads"
                        alert={true}
                        active={false}
                    />
                    <SideBarItem
                        icon={<PaperclipIcon />}
                        text="Snippets"
                        alert={true}
                        active={false}
                    />

                    <SideBarItem
                        icon={<BookmarkIcon />}
                        text="Bookmarks"
                        alert={true}
                        active={false}
                    />
                    <SideBarItem
                        icon={<UserIcon />}
                        text="Profile"
                        alert={true}
                        active={false}
                    />
                </SideBar>
                <main className="flex justify-between"></main>
            </div>
        </ThemeProvider>
    );
}
