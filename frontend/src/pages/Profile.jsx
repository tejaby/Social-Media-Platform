// services
import {
  listUserPostService,
  listUserInactivePostService,
} from "../services/post";

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
  const { token, loading } = useContext(UserContext);
  const {
    setUserPosts,
    setNextPageUserPosts,
    setArchivedPosts,
    setNextPageArchivedPosts,
  } = useContext(PostContext);

  const { executeRequest } = usePostRequest();

  useEffect(() => {
    if (token && !loading) {
      executeRequest(
        listUserPostService,
        setUserPosts,
        setNextPageUserPosts,
        token.access
      );
      executeRequest(
        listUserInactivePostService,
        setArchivedPosts,
        setNextPageArchivedPosts,
        token.access
      );
    }
  }, [token, loading]);

  return (
    <div className="max-w-3xl mx-auto sm:my-2">
      <UserProfile />
    </div>
  );
}

export default Profile;
