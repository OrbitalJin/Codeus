import { RegisterPayload } from "@/services/schema";
import { createUser } from "@/services/user-service";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthenticate = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const logIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error as string);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      setError(error as string);
    }
    return error;
  };

  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password,
      );

      const user = {
        id: credentials.user.uid,
        email: payload.email,
        handle: payload.handle,
        username: payload.username,
      };

      await createUser(user);
      navigate("/");
    } catch (error) {
      setError(error as string);
      console.log(error);
    }
    setLoading(false);
  };

  return {
    error,
    loading,
    register,
    logIn,
    logOut,
  };
};
