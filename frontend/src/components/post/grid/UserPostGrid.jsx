// context
import { InterfaceContext } from "../../../context/Interface";

// hooks
import useToggleModalPost from "../../../hooks/interface/useToggleModalPost";

// react
import { useContext } from "react";

function UserPostGrid({ src, alt }) {
  const { showViewPost, setShowViewPost } = useContext(InterfaceContext);

  const { toggleShowModal } = useToggleModalPost(setShowViewPost, showViewPost);
  return (
    <img
      className="h-48 sm:h-60 lg:h-72 w-full max-w-full object-cover object-center cursor-pointer"
      src={src}
      alt={alt}
      onClick={() => {
        toggleShowModal()
      }}
    />
  );
}

export default UserPostGrid;
