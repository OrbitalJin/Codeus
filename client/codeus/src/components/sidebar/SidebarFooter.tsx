"use client";

import { useContext } from "react";
import { MoreVertical, Sun, Moon, LogOut, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SidebarContext } from "./Sidebar";
import { useTheme } from "@/providers/theme-provider";
import { useNavigate } from "react-router-dom";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import { AuthContext } from "@/contexts/auth-context";

export default function SidebarFooter() {
  const { theme, setTheme } = useTheme();
  const { logOut } = useAuthenticate();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Trigger />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer">
          <UserIcon size={20} className="mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
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
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleLogOut()}
        >
          <LogOut size={20} className="mr-2 text-red-500" />
          <a className="text-red-500">Logout</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Trigger: React.FC = () => {
  const { expanded } = useContext(SidebarContext);
  const { authState } = useContext(AuthContext);
  const { user } = authState;

  return (
    <div className="flex items-center p-3 m-3 hover:bg-muted transition-all cursor-pointer rounded-full">
      <img
        src={"https://ui-avatars.com/api/?name=" + user?.username}
        alt=""
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
      />
      {expanded && (
        <div
          className={`flex justify-between items-center overflow-hidden transition-all ${expanded
              ? "w-52 ml-3 opacity-100"
              : "w-0 ml-0 opacity-0 justify-center"
            }`}
          style={{
            transition: "opacity 0.3s, width 0.3s, margin-left 0.3s",
          }}
        >
          <div className="leading-3 text-left">
            <h4 className="text-sm font-semibold">{user?.username}</h4>
            <span className="text-xs text-gray-400">/{user?.handle}</span>
          </div>
          <MoreVertical size={20} className="ml-2" />
        </div>
      )}
    </div>
  );
};
