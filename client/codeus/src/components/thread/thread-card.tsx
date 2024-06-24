import { ThreadModel } from "@/services/schema";
import { MessageCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";

type ThreadProps = {
  thread: ThreadModel;
  onDelete: (id: string) => void;
};

const ThreadCard: React.FC<ThreadProps> = ({ thread }: ThreadProps) => {
  const navigate = useNavigate();
  return (
    <div
      id="card"
      className="group flex flex-row items-center p-6 border-2 space-x-5 rounded-md cursor-pointer bg-background transition-all hover:bg-muted"
      onClick={() => {
        console.log("yo");
        navigate("/@/" + thread.id);
      }}
    >
      <img
        src={"https://ui-avatars.com/api/?name=" + thread.title}
        alt=""
        className="w-13 h-13 rounded-full"
      />
      <div id="card-content" className="flex flex-col flex-grow space-y-1">
        <a className="text-xl font-bold">{thread.title}</a>
        <a className="text-sm text-gray-400">{thread.description}</a>
      </div>
      <div id="side-bar" className="flex flex-col space-y-1">
        <div
          id="message-icon-container"
          className="flex flex-row py-1 px-2 justify-center items-center space-x-2 bg-muted rounded-full group-hover:bg-background"
        >
          <MessageCircle size={20} />
          <a>{thread.postCount}</a>
        </div>
        <div
          id="users-icon-container"
          className="flex flex-row py-1 px-2 justify-center items-center space-x-2 bg-muted rounded-full group-hover:bg-background"
        >
          <Users size={20} />
          <a>{thread.postCount}</a>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
