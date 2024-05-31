"use client";

import Image from "next/image";
import { useContext } from "react";
import { useTheme } from "next-themes";
import { MoreVertical, Sun, Moon, LogOut, UserIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SidebarContext } from "./Sidebar";

export interface SidebarFooterProps {
    image: string;
    displayName: string;
    handle: string;
}

export default function SidebarFooter(props: SidebarFooterProps) {
    const { theme, setTheme } = useTheme();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button>
                    <Trigger {...props} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
                <DropdownMenuItem>
                    <LogOut size={20} className="mr-2 text-red-500" />
                    <a className="text-red-500">Logout</a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const Trigger: React.FC<SidebarFooterProps> = ({
    image,
    displayName,
    handle,
}: SidebarFooterProps) => {
    const { expanded, setExpanded } = useContext(SidebarContext);

    return (
        <div className="flex items-center p-3 m-3 hover:bg-muted transition-all cursor-pointer rounded-full">
            <Image
                src={image}
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
            />
            {expanded && (
                <div
                    className={`flex justify-between items-center overflow-hidden transition-all ${
                        expanded
                            ? "w-52 ml-3 opacity-100"
                            : "w-0 ml-0 opacity-0 justify-center"
                    }`}
                    style={{
                        transition:
                            "opacity 0.3s, width 0.3s, margin-left 0.3s",
                    }}
                >
                    <div className="leading-3 text-left">
                        <h4 className="text-sm font-semibold">{displayName}</h4>
                        <span className="text-xs text-gray-400">/{handle}</span>
                    </div>
                    <MoreVertical size={20} className="ml-2" />
                </div>
            )}
        </div>
    );
};
