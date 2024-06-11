// services
import {
  deletePostService,
  deactivatePostService,
  activatePostService,
} from "../../../services/post";

// hooks
import usePostActions from "../../../hooks/post/usePostActions";
import useClickOutside from "../../../hooks/interface/useClickOutside";
import usePostManagement from "../../../hooks/post/usePostManagement";

// react
import { useRef } from "react";

function UserPostOptions({
  toggleDropdown,
  viewPost,
  updateGlobalModal,
  token,
}) {
  const { executeRequestPost } = usePostActions();

  const { deletePostState, movePostToArchived, movePostToActive } =
    usePostManagement();

  const dropDownRef = useRef(null);

  useClickOutside(dropDownRef, () => {
    toggleDropdown();
  });

  const handleDeletePost = async () => {
    if (token) {
      const success = await executeRequestPost(
        deletePostService,
        "delete",
        null,
        token.access,
        viewPost.id,
        updateGlobalModal
      );
      if (success) {
        deletePostState(viewPost.id);
      }
    }
  };

  const handleDeactivatePost = async () => {
    if (token) {
      const success = await executeRequestPost(
        deactivatePostService,
        "deactivate",
        null,
        token.access,
        viewPost.id,
        updateGlobalModal
      );
      if (success) {
        movePostToArchived(viewPost.id);
      }
    }
  };

  const handleActivatePost = async () => {
    if (token) {
      const success = await executeRequestPost(
        activatePostService,
        "activate",
        null,
        token.access,
        viewPost.id
      );
      if (success) {
        movePostToActive(viewPost.id);
      }
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
