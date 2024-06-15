import SideBar from "@/components/sidebar/Sidebar";
import React from "react";

import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchUserByHandle from "@/hooks/useFetchUserByHandle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePostList from "./ProfilePostList";

const Profile: React.FC = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const user = useFetchUserByHandle(handle as string);

  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <main className="flex justify-center flex-1 overflow-y-auto">
        <div id="container" className="flex-1 flex flex-col">
          <div
            id="banner"
            className="flex flex-row items-center px-2 shadow-sm"
          >
            <button
              className="rounded-full p-1 transition-all hover:bg-muted "
              onClick={() => {
                navigate("/home");
              }}
            >
              <ArrowLeft />
            </button>
            <a className="font-bold text-xl p-5">{user?.username}</a>
          </div>
          <div
            id="container-profile"
            className="flex flex-row space-x-5 p-5 border-red-500"
          >
            <img
              className="cursor-pointer rounded-lg"
              width={120}
              height={120}
              src="https://64.media.tumblr.com/e44bf87ad01b3dd7dade37a2e30e359f/5f3a0cd53b41ec9d-3a/s500x750/8ea32ea7789c3cb9ee7e928b65ab291fcbf156da.jpg"
            />
            <div className="flex flex-col">
              <a className="font-bold text-lg">{user?.username}</a>
              <a className="text-xs text-gray-400">/{user?.handle}</a>
            </div>
          </div>
          <Tabs defaultValue="posts">
            <TabsList className="w-full rounded-none">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="world">World!</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <ProfilePostList uid={user?.id as string} />
            </TabsContent>
            <TabsContent value="world">world</TabsContent>
          </Tabs>
        </div>
        <div className="grow border-l h-full " />
      </main>
    </div>
  );
};

export default Profile;
