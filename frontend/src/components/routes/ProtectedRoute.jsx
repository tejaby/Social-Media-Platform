import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children, isAllowed, redirectTo = "/home" }) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
