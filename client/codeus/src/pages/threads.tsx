import useThreads from "@/hooks/threads/useThreads";
import Banner from "./banner";
import PageWrapper from "./page-wrapper";
import ThreadList from "@/components/thread/thread-list";

const Threads = () => {
  const { threads, loading, error, handleDelete } = useThreads();
  return (
    <PageWrapper>
      <Banner title="Threads" />
      <ThreadList
        threads={threads}
        loading={loading}
        error={error}
        handleDelete={handleDelete}
      />
    </PageWrapper>
  );
};
export default Threads;
