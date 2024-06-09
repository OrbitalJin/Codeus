import { AuthState } from "@/providers/auth-context-provider";
import { createContext } from "react";

type AuthContextProps = {
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
};

const defaultAuthContextValue: AuthContextProps = {
  authState: {
    user: null,
    loading: true,
  },
  setAuthState: () => {},
};

export const AuthContext = createContext<AuthContextProps>(
  defaultAuthContextValue,
);
