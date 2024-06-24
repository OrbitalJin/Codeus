import { useParams } from "react-router-dom";
import PageWrapper from "./page-wrapper";
import PageBanner from "./banner";
import ThreadInfo from "@/components/thread/thread-info";
import ThreadTabs from "@/components/thread/thread-tabs";
import useThread from "@/hooks/threads/useThread";

const ThreadPage = () => {
  const { threadId } = useParams();
  const { thread } = useThread(threadId as string);

  return (
    <PageWrapper>
      <PageBanner title={thread?.title as string} back />
      {thread && <ThreadInfo thread={thread} />}
      <ThreadTabs threadId={thread?.id as string} />
    </PageWrapper>
  );
};
export default ThreadPage;
