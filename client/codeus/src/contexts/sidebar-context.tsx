import { createContext } from "react";

export interface SidebarContextProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

export const SidebarContext = createContext({} as SidebarContextProps);
