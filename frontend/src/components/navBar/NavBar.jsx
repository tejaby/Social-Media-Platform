// Libraries
import { NavLink } from "react-router-dom";

// services
import { logoutUser } from "../../services/user";

// context
import { UserContext } from "../../context/User";

// hooks
import UseSvgLoader from "../../hooks/useSvgLoader";
import useTokenLocalStorage from "../../hooks/user/useTokenLocalStorage";
import useFormSubmit from "../../hooks/user/useFormSubmit";

// react
import { useContext, useState } from "react";

function navBar() {
  const { user } = useContext(UserContext);

  const { getToken } = useTokenLocalStorage("userToken");
  const { onSubmit } = useFormSubmit(logoutUser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFormSubmit = () => {
    const token = getToken();
    onSubmit(token, "logout");
  };

  return (
    <nav className="flex sm:flex-col items-center sm-items-start sm:justify-between sm:fixed sm:w-64 md:w-72 lg:w-80 h-16 sm:h-screen border-t-2 sm:border-t-0 sm:border-r-2 sm:py-6 sm:px-6 overflow-hidden">
      <div className="hidden sm:flex flex-col gap-2 w-full py-2 px-3">
        <NavLink to="/home">
          <UseSvgLoader
            name="logo"
            options={{ width: "48px", height: "48px" }}
          />
          <span className="font-semibold text-xl tracking-tight">NotDark</span>
        </NavLink>
      </div>
      <div className="flex justify-evenly items-center sm:hidden w-full h-full">
        <NavLink to="/" className="rounded-xl">
          <UseSvgLoader
            name="home"
            options={{ width: "32px", height: "32px" }}
          />
        </NavLink>
        <NavLink to="/explore" className="rounded-xl">
          <UseSvgLoader
            name="explore"
            options={{ width: "32px", height: "32px" }}
          />
        </NavLink>
        <NavLink to="/post" className="rounded-xl bg-primary">
          <UseSvgLoader
            name="plus"
            options={{ width: "32px", height: "32px" }}
          />
        </NavLink>
        <NavLink to="/notifications" className="rounded-xl">
          <UseSvgLoader
            name="bell"
            options={{ width: "32px", height: "32px" }}
          />
        </NavLink>
        <NavLink to="/account" className="rounded-xl">
          <UseSvgLoader
            name="user"
            options={{ width: "32px", height: "32px", color: "blue" }}
          />
        </NavLink>
      </div>
      <div className="hidden sm:flex justify-center sm:flex-col sm:justify-center gap-4 w-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `rounded-xl sm:py-2 sm:px-3 hover:text-primary hover:bg-gray-100 ${
              isActive && "font-semibold text-primary"
            }`
          }
        >
          Inicio
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `rounded-xl sm:py-2 sm:px-3 hover:text-primary hover:bg-gray-100 ${
              isActive && "font-semibold text-primary"
            }`
          }
        >
          Explorar
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `rounded-xl sm:py-2 sm:px-3 hover:text-primary hover:bg-gray-100 ${
              isActive && "font-semibold text-primary"
            }`
          }
        >
          Notificaciones
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) =>
            `rounded-xl sm:py-2 sm:px-3 hover:text-primary hover:bg-gray-100 ${
              isActive && "font-semibold text-primary"
            }`
          }
        >
          Perfil
        </NavLink>
        <NavLink
          to="/post"
          className="rounded-xl max-w-fit sm:py-2 sm:px-3 text-white bg-primary"
        >
          Postear
        </NavLink>
      </div>
      <div
        className="hidden relative sm:flex items-center justify-between gap-2 w-full py-2 px-3 cursor-pointer hover:bg-gray-100"
        onClick={handleModal}
      >
        <div className="flex flex-col">
          {user && (
            <>
              <p className="text-sm">
                {user.user.first_name.length < 1
                  ? "admin"
                  : user.user.first_name}
              </p>
              <p className="text-sm">@{user.user.username}</p>
            </>
          )}
        </div>
        <div>
          <UseSvgLoader
            name="dots-vertical"
            options={{ width: "24px", height: "24px" }}
          />
        </div>
        {isModalOpen && (
          <div className="flex flex-col w-full p-2 absolute border border-primary rounded-xl left-0 bottom-full z-10 overflow-hidden">
            <button className="text-start rounded-xl py-2 px-3 hover:text-primary hover:bg-gray-100">
              Configuración
            </button>
            <button className="text-start rounded-xl py-2 px-3 hover:text-primary hover:bg-gray-100">
              Cambiar tema
            </button>
            <button
              className="text-start rounded-xl py-2 px-3 hover:text-primary hover:bg-gray-100"
              onClick={handleFormSubmit}
            >
              Salir
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default navBar;
