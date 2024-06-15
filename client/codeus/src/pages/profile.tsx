import SideBar from "@/components/sidebar/Sidebar";
import React from "react";
import UserPage from "./user";

const Profile: React.FC = () => {
  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <main className="flex justify-center flex-1 overflow-y-auto">
        <UserPage />
        <div className="grow border-l h-full " />
      </main>
    </div>
  );
};

export default Profile;
