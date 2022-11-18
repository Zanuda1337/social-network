import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { authSelector } from "src/features/Auth/Auth.slice";
import { useAppSelector } from "src/hooks/hooks";

type TProtectedRouteProps = {
  children: ReactNode;
};
const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ children }) => {
  const auth = useAppSelector(authSelector);
  return <>{auth.isLoggedIn ? children : <Navigate to="auth/login" />}</>;
};

export default ProtectedRoute;
