import { type User, onAuthStateChanged, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "@/contexts/auth-context";

type Props = {
  children: React.ReactNode;
};

// Represents the auth state
export type AuthState = {
  // The current signed in user
  user: User | null;
  // The current auth status (signing in, out etc...)
  loading: boolean;
};

// This is the AuthContext Provider which will wrap the entire and Provide
// Any children with everything needed to interact with the curretn auth state
const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  const auth = getAuth();
  // The state
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthState({
        user: currentUser ? currentUser : null,
        loading: false,
      });
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        authState: authState,
        setAuthState: setAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
