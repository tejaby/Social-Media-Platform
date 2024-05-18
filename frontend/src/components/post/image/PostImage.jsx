// context
import { InterfaceContext } from "../../../context/Interface";
import { PostContext } from "../../../context/Post";

// hooks
import useToggleModalPost from "../../../hooks/interface/useToggleModalPost";

// react
import { useContext } from "react";

function PostImage({ src, alt, post }) {
  const { showViewPost, setShowViewPost } = useContext(InterfaceContext);
  const { setViewPost } = useContext(PostContext);

  const { toggleShowModal } = useToggleModalPost(setShowViewPost, showViewPost);

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onClick={() => {
        setViewPost(post);
        toggleShowModal();
      }}
    />
  );
}

export default PostImage;
