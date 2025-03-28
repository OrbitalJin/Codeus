import React from "react";
import { Navigate, useParams } from "react-router-dom";
import ProfileInfo from "@/components/profile/profile-info";
import ProfileTabs from "@/components/profile/profile-tabs";
import PageWrapper from "./page-wrapper";
import Banner from "./banner";
import { InfinitySpin } from "react-loader-spinner";
import useUser from "@/hooks/auth/useUser";

const Profile: React.FC = () => {
  const { handle } = useParams();
  const { user, loading, error } = useUser(handle as string);

  return (
    <PageWrapper>
      {error ? (
        <Navigate to="/" replace />
      ) : loading ? (
        <InfinitySpin />
      ) : (
        <>
          <Banner
            title={user?.username as string}
            subTitle={"/" + user?.handle}
            back
          />
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
