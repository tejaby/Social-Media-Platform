// Libraries
import { Navigate, Outlet } from "react-router-dom";

// context
import { UserContext } from "../../context/User";

// react
import { useContext } from "react";

function ProtectedRoute({ children, isAllowed, redirectTo = "/home" }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
