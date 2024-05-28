import {
    HomeIcon,
    BookmarkIcon,
    UserIcon,
    SettingsIcon,
    SearchIcon,
    AtSignIcon,
} from "lucide-react";

const LeftBar: React.FC = () => {
    // This is going to be the main leftbar component with
    // Home, Explore, Bookmarks, Threads, Profile, and Settings tabs

    return (
        <div className="flex flex-col w-1/6 bg-gray-800 text-white h-full">
            <div className="flex flex-col items-center justify-center h-1/4 bg-gray-900">
                <a href="/" className="text-2xl font-bold">
                    Code<span className="text-primary">us</span>
                </a>
            </div>
            <div className="flex flex-col items-center justify-center h-5/6 ">
                <a
                    href="/"
                    className="py-3 w-full text-center hover:bg-red-500"
                >
                    <HomeIcon size={24} /> Home
                </a>
                <a href="/" className="py-3 w-full text-center">
                    <SearchIcon size={24} /> Explore
                </a>
                <a href="/" className="py-3 w-full text-center">
                    <BookmarkIcon size={24} /> Bookmarks
                </a>
                <a href="/" className="py-3 w-full text-center">
                    <AtSignIcon size={24} /> Threads
                </a>
                <a href="/" className="py-3 w-full text-center">
                    <UserIcon size={24} /> Profile
                </a>
                <a href="/" className="py-3 w-full text-center">
                    <SettingsIcon size={24} /> Settings
                </a>
            </div>
        </div>
    );
};

export default LeftBar;
