// services
import { logoutService } from "../../../services/auth";

// context
import { UserContext } from "../../../context/User";
import { InterfaceContext } from "../../../context/Interface";

// hooks
import { useAuthRequest } from "../../../hooks/user/useAuthRequest";

// react
import { useContext, useEffect } from "react";

function OptionsModal({ toggleAccountModal }) {
  const { executeRequest } = useAuthRequest(logoutService);

  const { token } = useContext(UserContext);

  const { theme, setTheme } = useContext(InterfaceContext);

  const handleFormSubmit = () => {
    executeRequest("logout", null, { refresh: token.refresh });
  };

  const handleChangeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("darkMode", "dark");
    } else {
      setTheme("light");
      localStorage.removeItem("darkMode");
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const OptionsModalMobile = () => {
    return (
      <div
        className="absolute flex flex-col w-48 p-2 border border-colorHover dark:border-darkColorHover rounded-xl right-2 top-full bg-white dark:bg-DarkColor z-10"
        onClick={toggleAccountModal}
      >
        <button className="text-start rounded-xl py-2 px-3 text-black dark:text-white">
          Configuración
        </button>
        <button
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white"
          onClick={handleChangeTheme}
        >
          Cambiar tema
        </button>
        <button className="text-start rounded-xl py-2 px-3 text-black dark:text-white">
          Ver perfil
        </button>
        <button
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white"
          onClick={handleFormSubmit}
        >
          Salir
        </button>
      </div>
    );
  };

  const OptionsModalDesktop = () => {
    return (
      <div className="absolute flex flex-col w-48 p-2 border border-colorHover dark:border-darkColorHover rounded-xl left-0 bottom-full bg-white dark:bg-DarkColor z-10">
        <button className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover">
          Configuración
        </button>
        <button
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover"
          onClick={handleChangeTheme}
        >
          Cambiar tema
        </button>
        <button className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover">
          Ver perfil
        </button>
        <button
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover"
          onClick={handleFormSubmit}
        >
          Salir
        </button>
      </div>
    );
  };

  return { OptionsModalMobile, OptionsModalDesktop };
}

export default OptionsModal;
