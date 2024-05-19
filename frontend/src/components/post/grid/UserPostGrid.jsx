// context
import { InterfaceContext } from "../../../context/Interface";
import { PostContext } from "../../../context/Post";

// hooks
import useToggleModalPost from "../../../hooks/interface/useToggleModalPost";

// react
import { useContext } from "react";

function UserPostGrid({ post }) {
  const { showViewPost, setShowViewPost } = useContext(InterfaceContext);
  const { setViewPost } = useContext(PostContext);

  const { toggleShowModal } = useToggleModalPost(setShowViewPost, showViewPost);
  return (
    <img
      className="h-48 sm:h-60 lg:h-72 w-full max-w-full object-cover object-center cursor-pointer"
      src={post.image}
      alt={post.author.username}
      onClick={() => {
        setViewPost(post);
        toggleShowModal();
      }}
    />
  );
}

export default UserPostGrid;
