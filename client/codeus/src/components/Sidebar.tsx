"use client";
import {
    ChevronFirst,
    MoreVertical,
    ChevronLast,
    Sun,
    Moon,
    LogOutIcon,
    LogIn,
    LogOut,
    UserIcon,
} from "lucide-react";
import Image from "next/image";
import { createContext, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { useTheme } from "next-themes";
import Link from "next/link";

interface UserFooterProps {
    image: string;
    displayName: string;
    handle: string;
}

interface SideBarProps {
    children: React.ReactNode;
    userFooter: UserFooterProps;
}

const SidebarContext = createContext(true);

export default function SideBar({ children, userFooter }: SideBarProps) {
    const [expanded, setExpanded] = useState<boolean>(true);
    return (
        <aside className="h-screen pl-40">
            <nav className="h-full flex flex-col border-r">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <Link
                        href="/"
                        className={`px-3 text-3xl overflow-hidden transition-all ${
                            expanded ? "w-50" : "px-0 w-0"
                        }`}
                    >
                        <p>
                            <a>Code</a>
                            <a className="font-bold text-indigo-500">us</a>
                            <a>{"_"}</a>
                        </p>
                    </Link>
                    <Button
                        onClick={() => {
                            setExpanded(prev => !prev);
                        }}
                        className="p-1.5 rounded-lg bg-transparent hover:bg-transparent text-primary"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </Button>
                </div>
                <SidebarContext.Provider value={expanded}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                {expanded && (
                    <Button className="m-3 p-6 rounded-full bg-indigo-500 text-white hover:bg-indigo-600">
                        Create Post
                    </Button>
                )}
                <SidebarContext.Provider value={expanded}>
                    <UserFooter {...userFooter} />
                </SidebarContext.Provider>
            </nav>
        </aside>
    );
}

interface SideBarItemProps {
    icon: React.ReactNode;
    active: boolean;
    text: string;
    alert: boolean;
}

export function SideBarItem(props: SideBarItemProps) {
    const expanded = useContext(SidebarContext);
    const [active, setActive] = useState<boolean>(props.active);
    return (
        <li
            onClick={() => {
                setActive(!active);
            }}
            className={`
            relative flex items-center py-4 px-3 my-1
            font-large rounded-full cursor-pointer
            bg-transparent hover:bg-primary-foreground transition-all
        `}
        >
            {props.icon}
            <span
                className={`overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                }`}
            >
                {props.text}
            </span>
            {props.alert && (
                <div
                    className={`absolute right-5 w-2 h-2 rounded bg-indigo-400 ${
                        expanded ? "" : "top-3"
                    }`}
                ></div>
            )}
        </li>
    );
}

function UserFooter({ image, displayName, handle }: UserFooterProps) {
    const expanded = useContext(SidebarContext);
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center p-3 m-3 hover:bg-muted transition-all cursor-pointer rounded-full">
                    <Image
                        src={image}
                        alt=""
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                    />
                    <div
                        className={`
                    flex justify-between items-center overflow-hidden transition-all ${
                        expanded
                            ? "w-52 ml-3 opacity-100"
                            : "w-0 ml-0 opacity-0"
                    }
                `}
                        style={{
                            transition:
                                "opacity 0.3s, width 0.3s, margin-left 0.3s",
                        }}
                    >
                        {expanded && (
                            <>
                                <div className="leading-4">
                                    <h4 className="font-semibold">
                                        {displayName}
                                    </h4>
                                    <span className="text-xs text-gray-400">
                                        {handle}
                                    </span>
                                </div>
                                <MoreVertical size={20} className="ml-2" />
                            </>
                        )}
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <LogOut size={20} className="mr-2 text-destructive" />
                    <a className="text-destructive">Logout</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <UserIcon size={20} className="mr-2" />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        setTheme(theme === "dark" ? "light" : "dark");
                    }}
                >
                    {theme === "dark" ? (
                        <Sun size={20} className="mr-2" />
                    ) : (
                        <Moon size={20} className="mr-2" />
                    )}
                    <a>Toggle Theme</a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
