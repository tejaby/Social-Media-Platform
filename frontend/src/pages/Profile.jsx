// services
import {
  listUserPostService,
  listUserInactivePostService,
} from "../services/post";

import { listFollowersService, listFollowingService } from "../services/follow";

// components
import UserProfile from "../components/profile/UserProfile";

// context
import { UserContext } from "../context/User";
import { PostContext } from "../context/Post";

// hooks
import { usePostRequest } from "../hooks/post/usePostRequest";
import useFetchFollowData from "../hooks/follow/useFetchFollowData";

// react
import { useContext, useEffect, useState } from "react";

function Profile() {
  const { user, token, loading } = useContext(UserContext);
  const {
    setUserPosts,
    setNextPageUserPosts,
    setArchivedPosts,
    setNextPageArchivedPosts,
  } = useContext(PostContext);

  const { executeRequest } = usePostRequest();

  // Estado para almacenar el total de posts
  const [userPostCount, setUserPostCount] = useState(0);

  const { data: followers, loading: followersLoading } = useFetchFollowData(
    listFollowersService,
    user.id,
    token.access
  );

  const { data: following, loading: followingLoading } = useFetchFollowData(
    listFollowingService,
    user.id,
    token.access
  );

  useEffect(() => {
    if (token && !loading) {
      executeRequest(
        listUserPostService,
        setUserPosts,
        setNextPageUserPosts,
        setUserPostCount,
        token.access
      );
      executeRequest(
        listUserInactivePostService,
        setArchivedPosts,
        setNextPageArchivedPosts,
        null,
        token.access
      );
    }
  }, [token, loading]);

  return (
    <div className="max-w-3xl mx-auto sm:my-2">
      <UserProfile
        userPostCount={userPostCount}
        followers={followers}
        followersLoading={followersLoading}
        following={following}
        followingLoading={followingLoading}
      />
    </div>
  );
}

export default Profile;
