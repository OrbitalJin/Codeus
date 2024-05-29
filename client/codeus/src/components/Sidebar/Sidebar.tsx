"use client";

import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useState } from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import SidebarFooter, { SidebarFooterProps } from "./SidebarFooter";

export const SidebarContext = createContext(true);

interface SideBarProps {
    children: React.ReactNode;
    sidebarFooter: SidebarFooterProps;
}

export default function SideBar({ children, sidebarFooter }: SideBarProps) {
    const [expanded, setExpanded] = useState<boolean>(true);
    return (
        <aside className="h-screen pl-40">
            <nav className="h-full flex flex-col border-r">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <Link
                        href="/"
                        className={`group px-3 text-3xl overflow-hidden transition-all ${
                            expanded ? "w-50" : "px-0 w-0"
                        }`}
                    >
                        <span>Code</span>
                        <span className="font-bold text-indigo-500">us</span>
                        <span className="group-hover:animate-blink">{"_"}</span>
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
                    <SidebarFooter {...sidebarFooter} />
                </SidebarContext.Provider>
            </nav>
        </aside>
    );
}
