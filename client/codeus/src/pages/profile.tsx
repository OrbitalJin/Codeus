import React from "react";
import { Navigate, useParams } from "react-router-dom";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileTabs from "@/components/profile/ProfileTabs";
import PageWrapper from "./page-wrapper";
import Banner from "./banner";
import useUser from "@/hooks/useUser";
import { InfinitySpin } from "react-loader-spinner";

const Profile: React.FC = () => {
  const { handle } = useParams();
  const { user, loading, error } = useUser(handle as string);
  console.log(loading);

  return (
    <PageWrapper>
      {error ? (
        <Navigate to="/" replace />
      ) : loading ? (
        <InfinitySpin />
      ) : (
        <>
          <Banner title={user?.username as string} back />
          <ProfileInfo
            username={user?.username as string}
            handle={user?.handle as string}
            bio={user?.bio as string}
          />
          <ProfileTabs userId={user?.id as string} />
        </>
      )}
    </PageWrapper>
  );
};

export default Profile;
