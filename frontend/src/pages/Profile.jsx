// services
import { user_posts } from "../services/post";

// components
import UserProfile from "../components/profile/UserProfile";

// context
import { PostContext } from "../context/Post";

// hooks
import useApiFetch from "../hooks/post/useApiFetch";

// react
import { useContext } from "react";

function Profile() {
  const { setUserPosts } = useContext(PostContext);

  const { error } = useApiFetch(user_posts, setUserPosts);

  return (
    <div className="max-w-3xl mx-auto sm:my-2">
      <UserProfile />
    </div>
  );
}

export default Profile;
