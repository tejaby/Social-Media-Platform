// libraries
import { useNavigate } from "react-router-dom";

// services
import { logoutService } from "../../../services/auth";

// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";

// hooks
import { useAuthRequest } from "../../../hooks/user/useAuthRequest";

// react
import { useContext } from "react";

function UserOptionsMenu() {
  const { executeRequest } = useAuthRequest(logoutService);

  const { token } = useContext(UserContext);

  const { theme, setTheme } = useContext(InterfaceContext);

  const navigate = useNavigate();

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

  const OptionsMobile = () => {
    return (
      <div className="absolute flex flex-col w-48 p-2 border border-colorHover dark:border-darkColorHover rounded-xl right-2 top-full bg-white dark:bg-DarkColor z-10">
        <button
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white"
          onClick={() => {
            navigate("/settings");
          }}
        >
          Configuración
        </button>
        <button
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white"
          onClick={handleChangeTheme}
        >
          Cambiar tema
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

  const OptionsDesktop = () => {
    return (
      <div className="absolute flex flex-col w-48 p-2 border border-colorHover dark:border-darkColorHover rounded-xl left-0 bottom-full bg-white dark:bg-DarkColor z-10">
        <button
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover"
          onClick={() => {
            navigate("/settings");
          }}
        >
          Configuración
        </button>
        <button
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover"
          onClick={handleChangeTheme}
        >
          Cambiar tema
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
  return { OptionsMobile, OptionsDesktop };
}

export default UserOptionsMenu;
