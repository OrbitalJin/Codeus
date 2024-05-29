"use client";
import { ChevronFirst, MoreVertical, ChevronLast } from "lucide-react";
import Image from "next/image";
import { createContext, useContext, useState } from "react";
import { Button } from "@/components/ui/button";

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
        <aside className="h-screen">
            <nav className="h-full flex flex-col border-r">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <span
                        className={`text-3xl overflow-hidden transition-all ${
                            expanded ? "w-32" : "w-0"
                        }`}
                    >
                        Code<a className="text-indigo-500">us</a>
                    </span>
                    <button
                        onClick={() => {
                            setExpanded(prev => !prev);
                        }}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
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
            font-large rounded-md cursor-pointer
            transition-colors ${
                active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
            }
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
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                        expanded ? "" : "top-2"
                    }`}
                ></div>
            )}
        </li>
    );
}

function UserFooter({ image, displayName, handle }: UserFooterProps) {
    const expanded = useContext(SidebarContext);
    return (
        <div className="flex items-center p-3 m-3 hover:bg-gray-200 transition-all cursor-pointer rounded-full">
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
                    transition: "opacity 0.3s, width 0.3s, margin-left 0.3s",
                }}
            >
                {expanded && (
                    <>
                        <div className="leading-4">
                            <h4 className="font-semibold">{displayName}</h4>
                            <span className="text-xs text-gray-600">
                                {handle}
                            </span>
                        </div>
                        <MoreVertical size={20} className="ml-2" />
                    </>
                )}
            </div>
        </div>
    );
}
