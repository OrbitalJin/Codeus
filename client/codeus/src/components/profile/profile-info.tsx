import React, { useState } from "react";
import EditProfileButton from "./edit-profile-button";

interface ProfileInfoProps {
  username: string;
  handle: string;
  bio: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  username,
  handle,
  bio,
}: ProfileInfoProps) => {
  const [bio_, setBio_] = useState<string>(bio);
  return (
    <div
      id="container-profile"
      className="flex flex-row space-x-5 p-5 backdrop-blur"
    >
      <img
        className="cursor-pointer rounded-lg shadow-sm"
        width={120}
        height={120}
        src="https://64.media.tumblr.com/e44bf87ad01b3dd7dade37a2e30e359f/5f3a0cd53b41ec9d-3a/s500x750/8ea32ea7789c3cb9ee7e928b65ab291fcbf156da.jpg"
      />
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center space-x-1">
          <a className="font-bold text-lg">{username}</a>
          <div className="grow" />
          <EditProfileButton setBio={setBio_} />
        </div>
        <a className="text-xs text-gray-400">/{handle}</a>
        <p className="text-sm pt-3 text-gray-500">
          {bio_ ?? <span className="italic">Much empty</span>}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
