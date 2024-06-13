import { AuthContext } from "@/contexts/auth-context";
import { useContext } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}: ProtectedRouteProps) => {
  const { authState: state } = useContext(AuthContext);
  if (state.loading)
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <InfinitySpin color="grey" />
      </div>
    );
  return state.user ? children : <Navigate to="/login" replace />;
};
