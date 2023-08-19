import { useContext } from "react";

import { UserContext } from "../../context/User";

import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children, isAllowed, redirectTo = "/home" }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
