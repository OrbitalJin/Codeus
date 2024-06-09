import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthenticate = () => {
  const auth = getAuth();
  const [error, setError] = useState<string>("");
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

  return {
    error,
    logIn,
    logOut,
  };
};
