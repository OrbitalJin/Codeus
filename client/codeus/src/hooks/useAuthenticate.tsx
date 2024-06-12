import { RegisterPayload } from "@/services/schema";
import { createUser } from "@/services/userService";
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
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const logIn = async (email: string, password: string) => {
    try {
      signInWithEmailAndPassword(auth, email, password).then((creds) => {
        console.log(creds.user);
      });
      navigate("/");
    } catch (error) {
      setError(error as string);
    }
    return error;
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      setError(error as string);
    }
    return error;
  };

  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    try {
      createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password,
      ).then((creds) => {
        const id = creds.user.uid;
        const user = {
          id: id,
          email: payload.email,
          handle: payload.handle,
          username: payload.username,
        };
        createUser(user);
      });
    } catch (error) {
      setError(error as string);
      console.log(error);
    }
    setLoading(false);
    return error;
  };

  return {
    error,
    loading,
    register,
    logIn,
    logOut,
  };
};
