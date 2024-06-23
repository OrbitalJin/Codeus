import { UserModel } from "@/services/schema";
import UserService from "@/services/user-service";
import { useEffect, useState } from "react";

const useFetchUserById = (id: string) => {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    (async () => {
      setUser(await UserService.getInstance().fetchUser(id ? id : null));
    })();
  }, [id]);

  return user;
};

export default useFetchUserById;
