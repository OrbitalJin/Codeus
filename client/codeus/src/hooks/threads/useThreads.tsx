import { ThreadModel } from "@/services/schema";
import ThreadService from "@/services/thread-service";
import { useEffect, useState } from "react";

const useThreads = () => {
  const [threads, setThreads] = useState<ThreadModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const service = ThreadService.getInstance();

  const handleDelete = async (id: string) => {
    try {
      await service.deleteThread(id);
      setThreads(threads.filter((thread) => thread.id !== id));
    } catch (error) {
      console.log(error);
      setError(error ? true : false);
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const fetchedThreads = await service.fetchThreads();
        setThreads(fetchedThreads);
      } catch (error) {
        console.log(error);
        setError(error ? true : false);
      }
    })();
    setLoading(false);
  }, [service]);

  return {
    threads,
    loading,
    error,
    handleDelete,
  };
};

export default useThreads;
