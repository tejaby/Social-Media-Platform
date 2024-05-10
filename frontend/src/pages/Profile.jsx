// services
import { listUserPostService } from "../services/post";

// components
import UserProfile from "../components/profile/UserProfile";

// context
import { PostContext } from "../context/Post";

// hooks
import useApiFetch from "../hooks/post/useApiFetch";

// react
import { useContext } from "react";

function Profile() {
  const { setUserPost } = useContext(PostContext);

  const { error } = useApiFetch(listUserPostService, setUserPost);

  return (
    <div className="max-w-3xl mx-auto sm:my-2">
      <UserProfile />
    </div>
  );
}

export default Profile;
