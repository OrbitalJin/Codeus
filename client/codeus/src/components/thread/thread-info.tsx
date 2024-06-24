import React from "react";
import { AtSign, Verified } from "lucide-react";
import { ThreadModel } from "@/services/schema";

type ThreadInfoProps = {
  thread: ThreadModel;
};

const ThreadInfo: React.FC<ThreadInfoProps> = ({ thread }: ThreadInfoProps) => {
  return (
    <div className="flex items-center space-x-5 p-5 backdrop-blur">
      <img
        className="cursor-pointer rounded-lg shadow-sm"
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(thread.title)}`}
        alt={`Avatar for ${thread.title}`}
      />
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <a className="font-bold text-lg">{thread.title}</a>
          <Verified size={20} color="#6364E2" />
        </div>
        <p className="text-sm pt-1 text-gray-500 italic">
          {thread.description}
        </p>
      </div>
    </div>
  );
};

export default ThreadInfo;
