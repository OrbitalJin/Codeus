import { AuthContext } from "@/contexts/auth-context";
import { ArrowLeft } from "lucide-react";
import { ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";

type BannerProps = {
  title: string;
  back?: boolean;
  children?: ReactNode;
};

const Banner: React.FC<BannerProps> = ({
  title,
  back,
  children,
}: BannerProps) => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div
      id="banner"
      className="flex flex-row items-center px-2 shadow-sm sticky top-0 z-10 backdrop-blur-lg"
    >
      {back && (
        <button
          className="rounded-full p-1 transition-all hover:bg-muted"
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowLeft />
        </button>
      )}
      <a className="font-bold text-xl p-5">{title}</a>
      <a className="text-sm text-gray-400">/{authState.user?.handle}</a>
      <div className="grow" />
      {children}
    </div>
  );
};

export default Banner;
