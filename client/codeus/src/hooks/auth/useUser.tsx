import { UserModel } from "@/services/schema";
import UserService from "@/services/user-service";
import { useEffect, useState } from "react";

const useUser = (handle: string) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    (async (handle: string) => {
      try {
        const user = await UserService.getInstance().fetchUserByHandle(
          handle as string,
        );
        setUser(user);
      } catch (error) {
        console.log(error);
        setUser(null);
        setError(true);
      }
      setLoading(false);
    })(handle);
  }, [handle]);

  return {
    user,
    loading,
    error,
  };
};

export default useUser;
