import { ChevronLast } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useContext } from "react";
import { SidebarContext } from "./Sidebar";

export default function SidebarHeader() {
    const { expanded, setExpanded } = useContext(SidebarContext);
    return (
        <div
            className={`p-5 pb-3 flex items-center transition-all ${
                expanded ? "w-50 justify-between" : "justify-center"
            }`}
        >
            <Link
                href="/"
                className={`group text-4xl overflow-hidden transition-all ${
                    expanded ? "w-50" : "px-0 w-0 opacity-0 collapse"
                }`}
            >
                <span>Code</span>
                <span className="font-bold text-indigo-500">us</span>
                <span className="group-hover:animate-blink">{"_"}</span>
            </Link>
            <Button
                onClick={() => {
                    setExpanded(!expanded);
                }}
                className="p-1.5 rounded-lg bg-transparent hover:bg-transparent text-primary"
            >
                <ChevronLast
                    className={`transition-all ${
                        expanded ? "transform rotate-180" : ""
                    }`}
                />
            </Button>
        </div>
    );
}
