// services
import { listUserPostService } from "../services/post";

// components
import UserProfile from "../components/profile/UserProfile";

// context
import { UserContext } from "../context/User";
import { PostContext } from "../context/Post";

// hooks
import { usePostRequest } from "../hooks/post/usePostRequest";

// react
import { useContext, useEffect } from "react";

function Profile() {
  const { token } = useContext(UserContext);
  const { setUserPosts, setNextPageUserPosts } = useContext(PostContext);

  const { executeRequest } = usePostRequest(listUserPostService);

  useEffect(() => {
    if (token) {
      executeRequest(setUserPosts, setNextPageUserPosts, token.access);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto sm:my-2">
      <UserProfile />
    </div>
  );
}

export default Profile;
