// context
import { InterfaceContext } from "../../../context/Interface";
import { PostContext } from "../../../context/Post";

// hooks
import useModal from "../../../hooks/interface/useModal";

// react
import { useContext } from "react";

function PostGrid({ post }) {
  const { showViewPost, setShowViewPost } = useContext(InterfaceContext);
  const { setViewPost } = useContext(PostContext);

  const { toggleModal } = useModal();
  return (
    <div
      className="relative group cursor-pointer"
      onClick={() => {
        setViewPost(post);
        toggleModal(setShowViewPost, showViewPost);
      }}
    >
      <img
        src={post.image}
        alt={`Imagen de ${post.author.username}`}
        className="h-48 sm:h-60 lg:h-72 w-full max-w-full object-cover opacity-90 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20"></div>
    </div>
  );
}

export default PostGrid;
