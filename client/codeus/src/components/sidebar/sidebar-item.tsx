"use client";

import { SidebarContext } from "@/contexts/sidebar-context";
import { useContext } from "react";

interface SideBarItemProps {
  icon: React.ReactNode;
  active: boolean;
  text: string;
  onClick?: () => void;
}

export default function SideBarItem(props: SideBarItemProps) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      onClick={() => {
        props.onClick ? props.onClick() : null;
      }}
      className={`
                relative flex items-center py-5 px-3 my-1 font-large rounded-full cursor-pointer 
                cursor-pointerbg-transparent hover:bg-muted transition-all ${
                  expanded ? "justify-start" : "justify-center"
                } ${props.active ? "font-bold" : "font-normal"}`}
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
