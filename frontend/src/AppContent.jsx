// libraries
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// services
import { refreshTokenService } from "./services/auth";

// components
import ShowModal from "./components/modal/ShowModal";
import LoadingComponent from "./components/ui/LoadingComponent";

// pages
import Rutas from "./routers/Routes";
import Navbar from "./components/navBar/NavBar";

// context
import { InterfaceContext } from "./context/Interface";
import { UserContext } from "./context/User";

// hooks
import useDarkMode from "./hooks/interface/useDarkMode";
import { useAuthRequest } from "./hooks/user/useAuthRequest";

// react
import { useContext, useEffect } from "react";

function AppContent() {
  const { theme, showModal } = useContext(InterfaceContext);
  const { token, loading, setLoading } = useContext(UserContext);

  useDarkMode(theme);
  const { executeRequest } = useAuthRequest(refreshTokenService);

  useEffect(() => {
    if (token && loading) {
      executeRequest("refresh", null, { refresh: token.refresh }).finally(
        () => {
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }

    let refreshPeriodically;

    if (token) {
      refreshPeriodically = setInterval(() => {
        executeRequest("refresh", null, { refresh: token.refresh });
      }, 240000);
    }

    return () => {
      if (refreshPeriodically) {
        clearInterval(refreshPeriodically);
      }
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
        {loading ? (
          <LoadingComponent />
        ) : !!token ? (
          <>
            <div className="fixed sm:static order-2 sm:order-1 w-full h-16 sm:h-full bottom-0 bg-white dark:bg-DarkColor z-40">
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
      <Toaster position="bottom-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default AppContent;
