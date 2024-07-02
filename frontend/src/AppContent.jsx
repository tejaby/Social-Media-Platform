// libraries
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// services
import { refreshTokenService } from "./services/auth";

// components
import OverlayModal from "./components/modal/OverlayModal";
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
        className={`${
          !!token
            ? "grid grid-rows-[1fr_auto] sm:grid-rows-none sm:grid-cols-[auto_1fr] sm:gap-2"
            : "flex justify-center items-center"
        } w-full min-h-screen bg-white dark:bg-DarkColor`}
      >
        {loading ? (
          <LoadingComponent />
        ) : !!token ? (
          <>
            <div className="fixed bottom-0 sm:static w-full sm:w-36 lg:w-80 h-16 sm:h-full bg-white dark:bg-DarkColor z-40">
              <Navbar />
            </div>
            <div className="w-full h-full bg-white dark:bg-DarkColor">
              <Rutas />
            </div>
            {showModal && <OverlayModal />}
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
