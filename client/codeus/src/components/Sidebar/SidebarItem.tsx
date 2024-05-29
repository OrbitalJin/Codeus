"use client";

import { useContext, useState } from "react";
import { SidebarContext } from "./Sidebar";

interface SideBarItemProps {
    icon: React.ReactNode;
    active: boolean;
    text: string;
    alert: boolean;
}

export default function SideBarItem(props: SideBarItemProps) {
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
          bg-transparent hover:bg-muted transition-all
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
