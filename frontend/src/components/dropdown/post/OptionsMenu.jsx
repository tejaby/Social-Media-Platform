// components
import UserPostOptions from "./UserPostOptions";
import PostOptions from "./PostOptions";

// context
import { UserContext } from "../../../context/User";

// react
import { useContext } from "react";

function OptionsMenu({ toggleDropdown, viewPost, updateGlobalModal = true }) {
  const { user, token } = useContext(UserContext);

  return user.id === viewPost.author.id ? (
    <UserPostOptions
      toggleDropdown={toggleDropdown}
      viewPost={viewPost}
      updateGlobalModal={updateGlobalModal}
      token={token}
    />
  ) : (
    <PostOptions toggleDropdown={toggleDropdown} viewPost={viewPost} />
  );
}

export default OptionsMenu;
