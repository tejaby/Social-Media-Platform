// services
import {
  deletePostService,
  deactivatePostService,
  activatePostService,
} from "../../../services/post";

// hooks
import usePostActions from "../../../hooks/post/usePostActions";
import useClickOutside from "../../../hooks/interface/useClickOutside";

// react
import { useRef } from "react";

function UserPostOptions({
  toggleDropdown,
  viewPost,
  updateGlobalModal,
  token,
}) {
  const { executeRequestPost } = usePostActions();

  const dropDownRef = useRef(null);

  useClickOutside(dropDownRef, () => {
    toggleDropdown()
  });

  const handleDeletePost = () => {
    if (token) {
      executeRequestPost(
        deletePostService,
        "delete",
        null,
        token.access,
        viewPost.id,
        updateGlobalModal
      );
    }
  };

  const handleDeactivatePost = () => {
    if (token) {
      executeRequestPost(
        deactivatePostService,
        "deactivate",
        null,
        token.access,
        viewPost.id,
        updateGlobalModal
      );
    }
  };

  const handleActivatePost = () => {
    if (token) {
      executeRequestPost(
        activatePostService,
        "activate",
        null,
        token.access,
        viewPost.id
      );
    }
  };

  return (
    <div
      ref={dropDownRef}
      className="absolute flex flex-col w-48 p-2 border border-colorHover dark:border-darkColorHover rounded-xl right-2 top-full bg-white dark:bg-DarkColor cursor-pointer z-10"
      onClick={toggleDropdown}
    >
      <span
        className="text-start rounded-xl py-2 px-3 text-red-600 hover:bg-colorHover dark:hover:bg-darkColorHover"
        onClick={handleDeletePost}
      >
        Eliminar
      </span>
      {viewPost.state ? (
        <span
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover"
          onClick={handleDeactivatePost}
        >
          Archivar
        </span>
      ) : (
        <span
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover"
          onClick={handleActivatePost}
        >
          Hacer Público
        </span>
      )}
      <span className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover">
        Denunciar Post
      </span>
    </div>
  );
}

export default UserPostOptions;