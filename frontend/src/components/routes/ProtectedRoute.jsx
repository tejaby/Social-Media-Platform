// Libraries
import { Navigate, Outlet } from "react-router-dom";

// context
import { UserContext } from "../../context/User";

// react
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(UserContext);

  if (!token) {
    return <Navigate to="/home" />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
