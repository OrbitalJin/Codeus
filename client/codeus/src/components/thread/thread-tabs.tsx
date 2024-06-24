import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useThreadPosts from "@/hooks/threads/useThreadPosts";
import PostList from "../post/post-list";
import { Users } from "lucide-react";

type ThreadTabsProps = {
  threadId: string;
};

const ThreadTabs: React.FC<ThreadTabsProps> = ({
  threadId,
}: ThreadTabsProps) => {
  const hookProps = useThreadPosts(threadId as string);
  return (
    <Tabs defaultValue="snippets">
      <TabsList className="w-full rounded-none">
        <TabsTrigger value="snippets">Snippets</TabsTrigger>
        <TabsTrigger value="community">Community</TabsTrigger>
      </TabsList>
      <TabsContent value="snippets">
        <PostList {...hookProps} />
      </TabsContent>
      <TabsContent value="community">
        <div className="flex flex-col opacity-30 justify-center items-center p-10">
          <Users size={150} className="text-primary" />
          <h3 className="text-primary italic text-base">
            The community tab is where all the contributors to the thread are
            listed down
          </h3>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ThreadTabs;
