import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchUserByHandle from "@/hooks/useFetchUserByHandle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

const UserPage: React.FC = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const user = useFetchUserByHandle(handle as string);

  return user ? (
    <div id="container" className="flex-1 flex flex-col">
      <div id="banner" className="flex flex-row items-center px-2 shadow-sm">
        <button
          className="rounded-full p-1 transition-all hover:bg-muted "
          onClick={() => {
            navigate("/home");
          }}
        >
          <ArrowLeft />
        </button>
        <a className="font-bold text-xl p-5">{user.username}</a>
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
          <a className="font-bold text-lg">{user.username}</a>
          <a className="text-xs text-gray-400">/{user.handle}</a>
        </div>
      </div>
      <Tabs>
        <TabsList defaultValue="hello" className="w-full rounded-none">
          <TabsTrigger value="hello">Hello</TabsTrigger>
          <TabsTrigger value="world">World!</TabsTrigger>
        </TabsList>
        <TabsContent value="hello">hello</TabsContent>
        <TabsContent value="world">world</TabsContent>
      </Tabs>
    </div>
  ) : (
    <p className="text-muted">404 Not Found</p>
  );
};

export default UserPage;
