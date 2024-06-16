import React from "react";
import SideBar from "@/components/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import useFetchUserByHandle from "@/hooks/useFetchUserByHandle";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import ProfileTabs from "./ProfileTabs";

const Profile: React.FC = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const user = useFetchUserByHandle(handle as string);

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <main className="flex justify-center flex-1 overflow-y-auto">
        <div id="container" className="flex-1 flex flex-col">
          <ProfileHeader
            username={user?.username as string}
            onBackClick={handleBack}
          />
          <ProfileInfo
            username={user?.username as string}
            handle={user?.handle as string}
            bio={user?.bio}
          />
          <ProfileTabs userId={user?.id as string} />
        </div>
        <div className="grow border-l h-full" />
      </main>
    </div>
  );
};

export default Profile;
