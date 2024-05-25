// libraries
import { useNavigate } from "react-router-dom";

// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";

// hooks
import useModal from "../../../hooks/interface/useModal";

// react
import { useContext } from "react";

function OptionsMenu({ toggleDropdown, viewPost }) {
  const { showViewPost, setShowViewPost } = useContext(InterfaceContext);
  const { user } = useContext(UserContext);

  const { toggleModal } = useModal(setShowViewPost, showViewPost);

  const navigate = useNavigate();

  const handleUserPage = (username) => {
    navigate(`/profile/${username}`);
    toggleModal();
  };

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
        <button
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover"
          onClick={() => {
            handleUserPage(viewPost.author.username);
          }}
        >
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
