import useThreads from "@/hooks/threads/useThreads";
import Banner from "./banner";
import PageWrapper from "./page-wrapper";

const Threads = () => {
  const { threads } = useThreads();
  return (
    <PageWrapper>
      <Banner title="@Thread" />
      <div className="flex flex-col bg-red-500">
        {threads.map((thread) => (
          <div key={thread.id}>{thread.title}</div>
        ))}
      </div>
    </PageWrapper>
  );
};
export default Threads;
