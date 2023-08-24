// Libraries
import { Routes, Route, redirect } from "react-router-dom";

// components
import ProtectedRoute from "../components/routes/ProtectedRoute";

// pages
import Home from "../pages/Home";
import Post from "../pages/Post";
import Account from "../pages/Account";
// import Dashboard from "../pages/Dashboard";

function Rutas() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/post" element={<Post />} />
        <Route path="/account" element={<Account />} />
      </Route>

      {/* <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            isAllowed={!!user && user.permissions.includes("admin")}
            redirectTo="/account"
          >
            <Dashboard />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
}

export default Rutas;
