import { UserModel } from "@/services/schema";
import { fetchUserByHandle } from "@/services/user-service";
import { useEffect, useState } from "react";

const useFetchUserByHandle = (handle: string) => {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    (async () => {
      setUser(await fetchUserByHandle(handle ? handle : null));
    })();
  }, [handle]);

  return user;
};

export default useFetchUserByHandle;
