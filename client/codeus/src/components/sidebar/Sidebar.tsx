"use client";

import { createContext, useContext, useState } from "react";
import { Button } from "@/components/ui/button";

import SidebarFooter, { SidebarFooterProps } from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

interface SidebarContextProps {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
}

export const SidebarContext = createContext({} as SidebarContextProps);

interface SideBarProps {
    children: React.ReactNode;
    sidebarFooter: SidebarFooterProps;
}

export default function SideBar({ children, sidebarFooter }: SideBarProps) {
    const [expanded, setExpanded] = useState<boolean>(true);

    return (
        <aside className="pl-60">
            <nav className="h-full flex flex-col border-r">
                <SidebarContext.Provider value={{ expanded, setExpanded }}>
                    <SidebarHeader />
                    <ul className="flex-1 px-3">{children}</ul>
                    <Button
                        className={`m-3 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-all ${
                            expanded ? "w-50" : "w-0 opacity-0"
                        }`}
                    >
                        {expanded && "Create Post"}
                    </Button>
                    <SidebarFooter {...sidebarFooter} />
                </SidebarContext.Provider>
            </nav>
        </aside>
    );
}
