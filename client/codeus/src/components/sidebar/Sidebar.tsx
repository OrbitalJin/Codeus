"use client";

import { createContext, useState } from "react";

import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import CreatePost from "../create-post";
interface SidebarContextProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

export const SidebarContext = createContext({} as SidebarContextProps);

interface SideBarProps {
  children: React.ReactNode;
}

export default function SideBar({ children }: SideBarProps) {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <aside className="pl-60">
      <nav className="h-full flex flex-col border-r">
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
          <SidebarHeader />
          <ul className="flex-1 px-3">{children}</ul>
          <CreatePost expanded={expanded} />
          <SidebarFooter />
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}
