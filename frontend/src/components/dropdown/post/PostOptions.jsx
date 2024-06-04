// libraries
import { useNavigate } from "react-router-dom";

// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";

// hooks
import useModal from "../../../hooks/interface/useModal";
import useClickOutside from "../../../hooks/interface/useClickOutside";
import useFollowStatus from "../../../hooks/follow/useFollowStatus";

// react
import { useContext, useRef } from "react";

function PostOptions({ toggleDropdown, viewPost }) {
  const { showViewPost, setShowViewPost } = useContext(InterfaceContext);
  const { token } = useContext(UserContext);

  const { toggleModal } = useModal();

  const navigate = useNavigate();

  const { isFollowing, followUser, unfollowUser } = useFollowStatus(
    viewPost.author.id,
    token.access
  );

  const dropDownRef = useRef(null);

  useClickOutside(dropDownRef, () => {
    toggleDropdown();
  });

  const handleUserPage = (username) => {
    if (!!showViewPost) {
      toggleModal(setShowViewPost, showViewPost);
    }
    navigate(`/profile/${username}`);
  };
  return (
    <div
      ref={dropDownRef}
      className="absolute flex flex-col w-48 p-2 border border-colorHover dark:border-darkColorHover rounded-xl right-2 top-full bg-white dark:bg-DarkColor cursor-pointer z-10"
      onClick={toggleDropdown}
    >
      <span
        className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover"
        onClick={() => {
          handleUserPage(viewPost.author.username);
        }}
      >
        Ver perfil
      </span>
      {isFollowing ? (
        <span
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover"
          onClick={unfollowUser}
        >
          Siguiendo
        </span>
      ) : (
        <span
          className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover"
          onClick={followUser}
        >
          Seguir
        </span>
      )}
      <span className="text-start rounded-xl py-2 px-3 text-black dark:text-white hover:bg-colorHover dark:hover:bg-darkColorHover">
        Denunciar Post
      </span>
    </div>
  );
}

export default PostOptions;
