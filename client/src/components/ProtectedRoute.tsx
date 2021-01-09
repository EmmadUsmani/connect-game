import React from "react";
import { Redirect, Route } from "react-router-dom";

interface ProtectedRouteProps {
  accessible: boolean;
  children?: React.ReactNode;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  accessible,
  children,
  ...rest
}) => {
  return accessible ? <Route {...rest}>{children}</Route> : <Redirect to="/" />;
};

export default ProtectedRoute;
