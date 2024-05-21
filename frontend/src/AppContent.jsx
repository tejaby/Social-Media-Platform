// libraries
import { BrowserRouter } from "react-router-dom";

// services
import { refreshTokenService } from "./services/auth";

// components
import ShowModal from "./components/modal/ShowModal";

// pages
import Rutas from "./routers/Routes";
import Navbar from "./components/navBar/NavBar";

// context
import { InterfaceContext } from "./context/Interface";
import { UserContext } from "./context/User";

// hooks
import { useAuthRequest } from "./hooks/user/useAuthRequest";

// react
import { useContext, useEffect, useState } from "react";

function AppContent() {
  const { showModal } = useContext(InterfaceContext);
  const { token } = useContext(UserContext);

  const { executeRequest, error } = useAuthRequest(refreshTokenService);

  // Estado para indicar si los datos están siendo cargados
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && loading) {
      executeRequest("refresh", null, { refresh: token.refresh }).finally(
        () => {
          setLoading(false);
        }
      );
    }

    const refreshPeriodically = setInterval(() => {
      executeRequest("refresh", null, { refresh: token.refresh });
    }, 240000);

    return () => {
      clearInterval(refreshPeriodically);
    };
  }, [token, loading]);

  return (
    <BrowserRouter>
      <div
        className={`grid ${showModal && "fixed"} ${
          !!token
            ? "grid-cols-1 sm:grid-cols-[144px_1fr] lg:grid-cols-[320px_1fr] grid-rows-[1fr_64px] sm:grid-rows-1 grid-flow-row sm:grid-flow-col"
            : "grid-cols-1"
        } gap-2 w-full h-full bg-white dark:bg-DarkColor`}
      >
        {!!token ? (
          <>
            <div className="fixed sm:static order-2 sm:order-1 w-full h-16 sm:h-full bottom-0 bg-white dark:bg-DarkColor">
              <Navbar />
            </div>
            <div className="order-1 sm:order-2 w-full min-h-screen bg-white dark:bg-DarkColor">
              <Rutas />
            </div>
            {showModal && <ShowModal />}
          </>
        ) : (
          <Rutas />
        )}
      </div>
    </BrowserRouter>
  );
}

export default AppContent;
