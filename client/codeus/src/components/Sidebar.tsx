"use client"

import { ModeToggle } from "@/components/ModeToggle";
import {
    ChevronFirst,
    MoreVertical,
    ChevronLast,
} from "lucide-react";
import { createContext, useContext, useState } from "react";

interface SideBarProps {
    children: React.ReactNode
}

// Add context: https://www.youtube.com/watch?v=NFrFhBJPTmI

const SidebarContext = createContext(false);

export default function SideBar({children}: SideBarProps){
    const [expanded, setExpanded] = useState<boolean>(true);
    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <span 
                        className={`overflow-hidden transition-all ${ expanded ? "w-32" : "w-0"}`}
                    > Codeus</span>
                    <button onClick={() => {setExpanded(!expanded)}} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        {expanded ? <ChevronFirst/> : <ChevronLast/>}
                    </button>
                </div>
                <ModeToggle/>
                <SidebarContext.Provider value={expanded}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>
                <div className="border-t flex p-3">
                    <img 
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true" 
                        alt="" 
                        className="w-10 h-10 rounded-md"
                    />
                    <div className={`
                        flex justify-between items-center
                        ${ expanded ? "w-52 ml-3" : "w-0"}
                    `}>
                        <div className="leading-4">
                        <h4 className="font-semibold">John Doe</h4>
                        <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                        </div>
                        <MoreVertical size={20}/>
                    </div>
                </div>
            </nav>

        </aside>
    );
};

interface SideBarItemProps {
    icon: React.ReactNode;
    active: boolean;
    text: string;
    alert: boolean;
}

export function SideBarItem(props: SideBarItemProps) {
    const expanded = useContext(SidebarContext);
    return (
        <li className={`
            relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors ${
                props.active
                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                : "hover:bg-indigo-50 text-gray-600"
            }
        `}>
            {props.icon}
            <span className={`overflow-hidden translate-all ${
                    expanded ? "w-52 ml-3" : "w-0"}
                `}>{props.text}</span>
            {props.alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                    expanded ? "" : "top-2"
                }`}></div>
            )}
        </li>
    );
}
