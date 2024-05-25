// context
import { InterfaceContext } from "../../../context/Interface";
import { PostContext } from "../../../context/Post";

// hooks
import useModal from "../../../hooks/interface/useModal";

// react
import { useContext } from "react";

function UserPostGrid({ post }) {
  const { showViewPost, setShowViewPost } = useContext(InterfaceContext);
  const { setViewPost } = useContext(PostContext);

  const { toggleModal } = useModal();
  return (
    <img
      className="h-48 sm:h-60 lg:h-72 w-full max-w-full object-cover object-center cursor-pointer"
      src={post.image}
      alt={post.author.username}
      onClick={() => {
        setViewPost(post);
        toggleModal(setShowViewPost, showViewPost);
      }}
    />
  );
}

export default UserPostGrid;
