import { LucideHome } from "lucide-react";
import SideBar, { SideBarItem } from "./components/SideBar";
import Views from "./Views";

const App: React.FC = () => {
    return (
        <main className="App">
            <SideBar>
                <SideBarItem active={true} icon={<LucideHome/>} text="Home" alert={true}/>
                <SideBarItem active={true} icon={<LucideHome/>} text="Home" alert={true}/>
                <SideBarItem active={true} icon={<LucideHome/>} text="Home" alert={true}/>
                <SideBarItem active={true} icon={<LucideHome/>} text="Home" alert={true}/>
                <SideBarItem active={true} icon={<LucideHome/>} text="Home" alert={true}/>
                <SideBarItem active={true} icon={<LucideHome/>} text="Home" alert={true}/>
            </SideBar>
        </main>
    );
};

export default App;
