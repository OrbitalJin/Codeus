"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { MoreVertical, Sun, Moon, LogOut, UserIcon } from "lucide-react";
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export interface SidebarFooterProps {
    image: string;
    displayName: string;
    handle: string;
}

export default function SidebarFooter({
    image,
    displayName,
    handle,
}: SidebarFooterProps) {
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
                      expanded ? "w-52 ml-3 opacity-100" : "w-0 ml-0 opacity-0"
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
