import { ThreadModel } from "@/services/schema";
import ThreadService from "@/services/thread-service";
import { useEffect, useState } from "react";

const service = ThreadService.getInstance();

const useThread = (id: string) => {
  const [thread, setThread] = useState<ThreadModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    service.deleteThread(id);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      setThread(await service.fetchThread(id));
    })();
  }, [id]);

  return {
    loading,
    thread,
    handleDelete,
  };
};

export default useThread;
