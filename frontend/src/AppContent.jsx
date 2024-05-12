// libraries
import { BrowserRouter } from "react-router-dom";

// services
import { refreshTokenService } from "./services/user";

// components
import ShowModal from "./components/modal/ShowModal";

// pages
import Rutas from "./routers/Routes";
import Navbar from "./components/navBar/NavBar";

// context
import { InterfaceContext } from "./context/Interface";
import { UserContext } from "./context/User";

// hooks

// react
import { useContext, useEffect, useState } from "react";

function AppContent() {
  const { user, setUser, token, setToken } = useContext(UserContext);
  const { showModal, showModalProfile } = useContext(InterfaceContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshAuthToken = async () => {
      try {
        const response = await refreshTokenService({ refresh: token.refresh });
        setToken(response);
        localStorage.setItem("authToken", JSON.stringify(response));
      } catch (err) {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    if (token && loading) {
      refreshAuthToken();
    }

    const refreshPeriodically = setInterval(() => {
      refreshAuthToken();
    }, 240000);

    return () => {
      clearInterval(refreshPeriodically);
    };
  }, [token, loading]);

  return (
    <BrowserRouter>
      <div
        className={`bg-white dark:bg-darkModeColor grid ${
          showModal && "fixed"
        } ${
          !!user
            ? "grid-cols-1 sm:grid-cols-[144px_1fr] lg:grid-cols-[320px_1fr] grid-rows-[1fr_64px] sm:grid-rows-1 grid-flow-row sm:grid-flow-col"
            : "grid-cols-1"
        } gap-2 w-full h-full`}
      >
        {!!user ? (
          <>
            <div className="fixed sm:static order-2 sm:order-1 w-full h-16 sm:h-full bottom-0">
              <Navbar />
            </div>
            <div className="order-1 sm:order-2 w-full min-h-screen">
              <Rutas />
            </div>
            {showModal && <ShowModal />}
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
