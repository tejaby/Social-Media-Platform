// libraries
import { BrowserRouter } from "react-router-dom";

// pages
import Rutas from "./routers/Routes";
import Navbar from "./components/navBar/NavBar";

// context
import { UserContext } from "./context/User";

// hooks
import useAuthenticatedRequest from "./hooks/user/useAuthenticatedRequest";

// react
import { useContext, useEffect } from "react";

function AppContent() {
  const { user } = useContext(UserContext);

  const { onSubmit } = useAuthenticatedRequest();

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <BrowserRouter>
      <div className={`grid ${!!user ? "grid-cols-3" : "grid-cols-1"}`}>
        {!!user && (
          <div className="col-span-1">
            <Navbar />
          </div>
        )}
        <div className={`${!!user ? "col-span-2" : "col-span-1"}`}>
          <Rutas />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AppContent;
