import { AuthContext } from "@/contexts/auth-context";
import { useContext } from "react";
import { Input } from "../ui/input";
import { Send } from "lucide-react";

const CommentInput: React.FC = () => {
  const { authState } = useContext(AuthContext);
  return (
    <div className="flex flex-row items-center p-5 space-x-3 border-b-2 border-t-0">
      <img
        src={`https://ui-avatars.com/api/?name=${authState.user?.username}`}
        alt=""
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
      />
      <Input className="border-none" placeholder="Comment" />
      <Send className="cursor-pointer transition-all hover:text-indigo-500" />
    </div>
  );
};

export default CommentInput;
