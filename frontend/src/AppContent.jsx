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
      <div
        className={`grid ${
          !!user
            ? "grid-cols-1 sm:grid-cols-[144px_1fr] lg:grid-cols-[320px_1fr] grid-rows-[1fr_64px] sm:grid-rows-1 grid-flow-row sm:grid-flow-col"
            : "grid-cols-1"
        } gap-2`}
      >
        {!!user ? (
          <>
            <div className="fixed sm:static order-2 sm:order-1 w-full h-16 sm:h-full bottom-0 bg-white">
              <Navbar />
            </div>
            <div className="order-1 sm:order-2 w-full">
              <Rutas />
            </div>
          </>
        ) : (
          <div className="">
            <Rutas />
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default AppContent;
