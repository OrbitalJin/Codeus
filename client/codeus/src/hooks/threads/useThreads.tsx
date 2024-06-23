import { ThreadModel } from "@/services/schema";
import ThreadService from "@/services/thread-service";
import { useEffect, useState } from "react";

const useThreads = () => {
  const [threads, setThreads] = useState<ThreadModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const fetchedThreads = await ThreadService.getInstance().fetchThreads();
        setThreads(fetchedThreads);
      } catch (error) {
        console.log(error);
        setError(error ? true : false);
      }
    })();
    setLoading(false);
  }, []);

  return {
    threads,
    loading,
    error,
  };
};

export default useThreads;
