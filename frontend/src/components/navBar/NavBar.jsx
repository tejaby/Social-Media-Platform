// Libraries
import { NavLink } from "react-router-dom";

// services
import { logoutUser } from "../../services/user";

// context
import { UserContext } from "../../context/User";
import { InterfaceContext } from "../../context/Interface";

// hooks
import UseSvgLoader from "../../hooks/useSvgLoader";
import useTokenLocalStorage from "../../hooks/user/useTokenLocalStorage";
import useFormSubmit from "../../hooks/user/useFormSubmit";

// react
import { useContext, useState } from "react";

function navBar() {
  const { user } = useContext(UserContext);
  const { isModalPost, setIsModalPost } = useContext(InterfaceContext);

  const { getToken } = useTokenLocalStorage("userToken");
  const { onSubmit } = useFormSubmit(logoutUser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleModalPost = () => {
    setIsModalPost(!isModalPost);
  };

  const handleFormSubmit = () => {
    const token = getToken();
    onSubmit(token, "logout");
  };

  return (
    <nav className="flex sm:flex-col items-center sm-items-start sm:justify-between sm:fixed sm:w-36 lg:w-80 h-16 sm:h-screen border-t-2 sm:border-t-0 sm:border-r-2 sm:py-4 sm:px-6">
      <div className="hidden sm:block w-full">
        <NavLink
          to="/home"
          className="flex flex-col items-center lg:items-start gap-2 py-2 px-3"
        >
          <UseSvgLoader
            name="logo"
            options={{ width: "48px", height: "48px" }}
          />
          <span className="font-semibold text-xl tracking-tight">NotDark</span>
        </NavLink>
      </div>
      <div className="relative flex justify-evenly items-center sm:hidden w-full h-full">
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
        <NavLink to="/post" className="rounded-xl" onClick={toggleModalPost}>
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
        <NavLink to="/account" className="rounded-xl" onClick={handleModal}>
          <UseSvgLoader
            name="user"
            options={{ width: "32px", height: "32px", color: "blue" }}
          />
        </NavLink>
        {isModalOpen && (
          <div
            className="absolute flex flex-col w-1/2 p-2 border border-primary rounded-xl right-2 bottom-full bg-white z-10"
            onClick={handleModal}
          >
            <button className="text-start rounded-xl py-2 px-3">
              Configuración
            </button>
            <button className="text-start rounded-xl py-2 px-3">
              Ver perfil
            </button>
            <button
              className="text-start rounded-xl py-2 px-3"
              onClick={handleFormSubmit}
            >
              Salir
            </button>
          </div>
        )}
      </div>
      <div className="hidden sm:flex flex-col items-start gap-2 w-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex justify-center items-center gap-2 w-full py-2 px-3 rounded-xl hover:text-primary hover:bg-gray-100 ${
              isActive && "font-semibold text-primary"
            }`
          }
        >
          <UseSvgLoader
            name="home"
            options={{ width: "32px", height: "32px" }}
          />
          <span className="flex-grow hidden lg:block">Inicio</span>
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `flex justify-center items-center gap-2 w-full py-2 px-3 rounded-xl hover:text-primary hover:bg-gray-100 ${
              isActive && "font-semibold text-primary"
            }`
          }
        >
          <UseSvgLoader
            name="explore"
            options={{ width: "32px", height: "32px" }}
          />
          <span className="flex-grow hidden lg:block">Explorar</span>
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `flex justify-center items-center gap-2 w-full py-2 px-3 rounded-xl hover:text-primary hover:bg-gray-100 ${
              isActive && "font-semibold text-primary"
            }`
          }
        >
          <UseSvgLoader
            name="bell"
            options={{ width: "32px", height: "32px" }}
          />
          <span className="flex-grow hidden lg:block">Notificaciones</span>
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) =>
            `flex justify-center items-center gap-2 w-full py-2 px-3 rounded-xl hover:text-primary hover:bg-gray-100 ${
              isActive && "font-semibold text-primary"
            }`
          }
        >
          <UseSvgLoader
            name="user"
            options={{ width: "32px", height: "32px", color: "blue" }}
          />
          <span className="flex-grow hidden lg:block">Perfil</span>
        </NavLink>
        <NavLink
          to="/post"
          className="flex justify-center items-center gap-2 w-full py-2 px-3 rounded-xl hover:text-primary hover:bg-gray-100"
        >
          <UseSvgLoader
            name="plus"
            options={{ width: "32px", height: "32px", color: "blue" }}
          />
          <span className="flex-grow hidden lg:block">Postear</span>
        </NavLink>
      </div>
      <div
        className="hidden relative sm:flex justify-center lg:justify-between items-center gap-2 w-full py-2 px-3 cursor-pointer hover:bg-gray-100"
        onClick={handleModal}
      >
        <div className="hidden lg:flex flex-col">
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
        <div className="">
          <UseSvgLoader
            name="dots-vertical"
            options={{ width: "24px", height: "24px" }}
          />
        </div>
        {isModalOpen && (
          <div className="absolute flex flex-col w-48 p-2 border border-primary rounded-xl left-0 bottom-full bg-white z-10">
            <button className="text-start rounded-xl py-2 px-3 hover:text-primary hover:bg-gray-100">
              Configuración
            </button>
            <button className="text-start rounded-xl py-2 px-3 hover:text-primary hover:bg-gray-100">
              Cambiar tema
            </button>
            <button className="text-start rounded-xl py-2 px-3 hover:text-primary hover:bg-gray-100">
              Ver perfil
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
