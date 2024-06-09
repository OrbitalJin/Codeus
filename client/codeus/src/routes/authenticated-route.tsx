import { AuthContext } from "@/contexts/auth-context";
import { ReactNode, useContext } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const IndexIfAuthenticatedRoute: React.FC<Props> = ({
  children,
}: Props) => {
  const { authState: state } = useContext(AuthContext);
  if (state.loading)
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <InfinitySpin color="grey" />
      </div>
    );
  return !state.user ? children : <Navigate to="/" replace />;
};
