import { UserModel } from "@/services/schema";
import { fetchUser } from "@/services/userService";
import { useEffect, useState } from "react";

const useFetchUserById = (id: string) => {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    (async () => {
      setUser(await fetchUser(id ? id : null));
    })();
  }, [id]);

  return user;
};

export default useFetchUserById;
