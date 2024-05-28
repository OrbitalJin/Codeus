import SideBar, { SideBarItem } from "@/components/Sidebar";
import { HomeIcon } from "lucide-react";
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <div className="flex flex-row">
      <SideBar>
        <SideBarItem icon={<HomeIcon/>} text="Home" alert={true} active={false}/>
        <SideBarItem icon={<HomeIcon/>} text="Home" alert={true} active={false}/>
        <SideBarItem icon={<HomeIcon/>} text="Home" alert={true} active={false}/>
        <SideBarItem icon={<HomeIcon/>} text="Home" alert={true} active={false}/>
        <hr className="my-3"/>
        <SideBarItem icon={<HomeIcon/>} text="Home" alert={true} active={false}/>
        <SideBarItem icon={<HomeIcon/>} text="Home" alert={true} active={false}/>
      </SideBar>
      <main className="flex justify-between">
        <div className="grow h-full bg-slate-500">
          Hello World!
        </div>
        <div className="grow h-full bg-green-500">
          Hello World!
        </div>
        <div className="grow h-full bg-red-500">
          Hello World!
        </div>

      </main>
    </div>
    </ThemeProvider>
  );
}
