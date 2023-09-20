// libraries
import { BrowserRouter } from "react-router-dom";

// components
import ModalPost from "./components/modal/post/ModalPost";

// pages
import Rutas from "./routers/Routes";
import Navbar from "./components/navBar/NavBar";

// context
import { InterfaceContext } from "./context/Interface";
import { UserContext } from "./context/User";

// hooks
import useAuthenticatedRequest from "./hooks/user/useAuthenticatedRequest";

// react
import { useContext } from "react";

function AppContent() {
  const { user } = useContext(UserContext);
  const { showModal } = useContext(InterfaceContext);

  const { error } = useAuthenticatedRequest();

  return (
    <BrowserRouter>
      <div
        className={`grid ${showModal && "fixed"} ${
          !!user
            ? "grid-cols-1 sm:grid-cols-[144px_1fr] lg:grid-cols-[320px_1fr] grid-rows-[1fr_64px] sm:grid-rows-1 grid-flow-row sm:grid-flow-col"
            : "grid-cols-1"
        } gap-2 w-full h-full`}
      >
        {!!user ? (
          <>
            <div className="fixed sm:static order-2 sm:order-1 w-full h-16 sm:h-full bottom-0 bg-white">
              <Navbar />
            </div>
            <div className="order-1 sm:order-2 w-full">
              <Rutas />
            </div>
            {showModal && <ModalPost />}
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
