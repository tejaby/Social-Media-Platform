// services
import { logoutService } from "../../../services/user";

// context
import { UserContext } from "../../../context/User";
import { InterfaceContext } from "../../../context/Interface";

// hooks
import useFormSubmit from "../../../hooks/user/useFormSubmit";

// react
import { useContext, useEffect } from "react";

function OptionsModal({ toggleAccountModal }) {
  const { onSubmit } = useFormSubmit(logoutService);

  const { token } = useContext(UserContext);

  const { theme, setTheme } = useContext(InterfaceContext);

  const handleFormSubmit = () => {
    setTheme("light");
    localStorage.removeItem("darkMode");
    onSubmit("logout", null, { refresh: token.refresh });
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
        className="absolute flex flex-col w-48 p-2 border border-primary rounded-xl right-2 top-full bg-white dark:bg-darkModeColor z-10"
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
      <div className="absolute flex flex-col w-48 p-2 border border-primary rounded-xl left-0 bottom-full bg-white dark:bg-darkModeColor z-10">
        <button className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-darkModeHoverColor">
          Configuración
        </button>
        <button
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-darkModeHoverColor"
          onClick={handleChangeTheme}
        >
          Cambiar tema
        </button>
        <button className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-darkModeHoverColor">
          Ver perfil
        </button>
        <button
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-darkModeHoverColor"
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
