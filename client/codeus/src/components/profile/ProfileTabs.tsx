import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePostList from "./ProfilePostList";
import ProfileUpvotedPostList from "./ProfileUpvotedList";

interface ProfileTabsProps {
  userId: string;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ userId }) => {
  return (
    <Tabs defaultValue="posts">
      <TabsList className="w-full rounded-none">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="threads">Threads</TabsTrigger>
        <TabsTrigger value="votes">Votes</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <ProfilePostList uid={userId} />
      </TabsContent>
      <TabsContent value="threads">Threads</TabsContent>
      <TabsContent value="votes">
        <ProfileUpvotedPostList uid={userId} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
