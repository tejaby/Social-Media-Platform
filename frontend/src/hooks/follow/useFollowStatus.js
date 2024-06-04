// services
import {
  verifyUserFollow,
  followUserService,
  unfollowUserService,
} from "../../services/follow";

// react
import { useEffect, useState } from "react";

function useFollowStatus(user, access) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollowStatus = async () => {
      const response = await verifyUserFollow(user, access);
      setIsFollowing(response.is_following);
    };

    if (user) {
      checkFollowStatus();
    }
  }, [user]);

  const followUser = async () => {
    try {
      await followUserService(user, access);
      setIsFollowing(true);
    } catch (err) {
      console.error(err.data.error);
    }
  };

  const unfollowUser = async () => {
    try {
      await unfollowUserService(user, access);
      setIsFollowing(false);
    } catch (err) {
      console.error(err.data.error);
    }
  };

  return { isFollowing, followUser, unfollowUser };
}

export default useFollowStatus;
