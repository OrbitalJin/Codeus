import React from "react";
import { ArrowLeft } from "lucide-react";

interface ProfileHeaderProps {
  username: string;
  onBackClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  onBackClick,
}) => {
  return (
    <div
      id="banner"
      className="flex flex-row items-center px-2 shadow-sm sticky top-0 z-10 backdrop-blur-lg"
    >
      <button
        className="rounded-full p-1 transition-all hover:bg-muted"
        onClick={onBackClick}
      >
        <ArrowLeft />
      </button>
      <a className="font-bold text-xl p-5">{username}</a>
    </div>
  );
};

export default ProfileHeader;
