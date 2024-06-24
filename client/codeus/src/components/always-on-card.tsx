import { AuthContext } from "@/contexts/auth-context";
import { useContext } from "react";
import { Card, CardHeader } from "./ui/card";
import Logo from "./logo";
import CreatePostForm from "./post/create-post-form";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const AlwaysOnCard = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;
  const navigate = useNavigate();
  return (
    <div className="flex-1 border-l h-screen sticky top-0 flex flex-col space-y-5 justify-center items-center backdrop-blur-sm">
      <div className="space-y-5 w-full p-32 grow">
        <Card>
          <CardHeader>
            <Logo className="self-center text-4xl" />
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CreatePostForm setOpen={(open: boolean) => open} />
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-row items-center space-x-4">
              <img
                className="cursor-pointer rounded-lg shadow-sm"
                width={60}
                height={60}
                src="https://64.media.tumblr.com/e44bf87ad01b3dd7dade37a2e30e359f/5f3a0cd53b41ec9d-3a/s500x750/8ea32ea7789c3cb9ee7e928b65ab291fcbf156da.jpg"
              />
              <div className="flex flex-col space-y-1 grow">
                <a className="font-bold text-base">{user?.username}</a>
                <a className="text-xs text-gray-400">/{user?.handle}</a>
              </div>
              <Button
                onClick={() => {
                  navigate("/u/" + user?.handle);
                }}
              >
                Open
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
      <a className="text-gray-500 text-sm p-3">By Ouzaher Saad</a>
    </div>
  );
};

export default AlwaysOnCard;
