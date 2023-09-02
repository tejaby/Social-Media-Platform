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
    <nav className="flex flex-col items-start w-64 h-screen border-r-2 py-6 px-6">
      <div className="flex flex-col gap-2 w-full py-2 px-3">
        <NavLink to="/home">
          <UseSvgLoader
            name="logo"
            options={{ width: "48px", height: "48px" }}
          />
          <span className="font-semibold text-xl tracking-tight">NotDark</span>
        </NavLink>
      </div>
      <div className="flex-grow flex flex-col justify-center gap-4 w-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-hoverEffect py-2 px-3 hover:bg-gray-100 ${
              isActive && "font-semibold text-hoverEffect"
            }`
          }
        >
          Inicio
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `hover:text-hoverEffect py-2 px-3 hover:bg-gray-100 ${
              isActive && "font-semibold text-hoverEffect"
            }`
          }
        >
          Explorar
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `hover:text-hoverEffect py-2 px-3 hover:bg-gray-100 ${
              isActive && "font-semibold text-hoverEffect"
            }`
          }
        >
          Notificaciones
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) =>
            `hover:text-hoverEffect py-2 px-3 hover:bg-gray-100 ${
              isActive && "font-semibold text-hoverEffect"
            }`
          }
        >
          Perfil
        </NavLink>

        <button
          type="submit"
          className="rounded-xl w-1/2 py-2 px-3 text-white bg-background"
        >
          <NavLink to="/post" className="">
            Postear
          </NavLink>
        </button>
      </div>
      <div
        className="relative flex items-center justify-between gap-2 w-full py-2 px-3 cursor-pointer"
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
          <div className="flex flex-col w-full absolute z-10 left-0 bottom-full shadow">
            <button className="text-start py-2 px-3 hover:text-hoverEffect hover:bg-gray-100">
              Configuración
            </button>
            <button className="text-start py-2 px-3 hover:text-hoverEffect hover:bg-gray-100">
              Cambiar tema
            </button>
            <button
              className="text-start py-2 px-3 hover:text-hoverEffect hover:bg-gray-100"
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
