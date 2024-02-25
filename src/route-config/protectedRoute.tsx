import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../custom-hooks";
import { ReactElement } from "react";

interface IProtectedRoute {
  children: ReactElement;
}

const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const location = useLocation();

  const context = useUserContext();

  if (!context?.userContext?.isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
