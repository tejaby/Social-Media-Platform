// context
import { UserContext } from "../../../context/User";

// react
import { useContext } from "react";

function OptionsMenu({ toggleDropdown, viewPost }) {
  const { user } = useContext(UserContext);

  return (
    <div
      className="absolute flex flex-col w-48 p-2 border border-colorHover dark:border-darkColorHover rounded-xl right-2 top-full bg-white dark:bg-DarkColor z-10"
      onClick={toggleDropdown}
    >
      {user.id === viewPost.author.id && (
        <button className="text-start rounded-xl py-2 px-3 text-red-600 hover:bg-colorHover dark:hover:bg-darkColorHover">
          Eliminar
        </button>
      )}
      {user.id === viewPost.author.id && (
        <button className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover">
          Archivar
        </button>
      )}
      {user.id !== viewPost.author.id && (
        <button className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover">
          Ver perfil
        </button>
      )}
      {user.id !== viewPost.author.id && (
        <button className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover">
          {`Seguir a @${viewPost.author.username}`}
        </button>
      )}
      <button className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover">
        Denunciar Post
      </button>
    </div>
  );
}

export default OptionsMenu;
