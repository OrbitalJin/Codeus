"use client";

import { useContext, useState } from "react";
import { SidebarContext } from "./Sidebar";

interface SideBarItemProps {
    icon: React.ReactNode;
    active: boolean;
    text: string;
}

export default function SideBarItem(props: SideBarItemProps) {
    const { expanded, setExpanded } = useContext(SidebarContext);

    return (
        <li
            className={`
                relative flex items-center py-5 px-3 my-1 font-large rounded-full 
                cursor-pointerbg-transparent hover:bg-muted transition-all ${
                    expanded ? "justify-start" : "justify-center"
                }`}
        >
            {props.icon}
            <span
                className={`overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                }`}
            >
                {props.text}
            </span>
        </li>
    );
}
