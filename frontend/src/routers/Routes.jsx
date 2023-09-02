// Libraries
import { Routes, Route, redirect } from "react-router-dom";

// components
import ProtectedRoute from "../components/routes/ProtectedRoute";
import NotFound from "../components/routes/NotFound";

// pages
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Account from "../pages/Account";
// import Dashboard from "../pages/Dashboard";

function Rutas() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/inicio" element={<Home />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/explore" element={<Explore />} />
        <Route
          path="/notifications"
          element={<h1>notificaciones = private</h1>}
        />
        <Route path="/account" element={<Account />} />
        <Route path="/post" element={<h1>postear = private</h1>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Rutas;
