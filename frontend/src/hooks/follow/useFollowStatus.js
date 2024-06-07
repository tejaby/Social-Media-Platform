// libraries
import toast from "react-hot-toast";

// services
import {
  verifyUserFollow,
  followUserService,
  unfollowUserService,
} from "../../services/follow";

// utils
import { getFollowErrorMessage } from "../../utils/getErrorMessage";

// react
import { useEffect, useState } from "react";

function useFollowStatus(user, token) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const response = await verifyUserFollow(user, token);
        setIsFollowing(response.is_following);
      } catch (err) {
        const error = getFollowErrorMessage(err, "get");
        toast.error(error);
      }
    };

    if (user) {
      checkFollowStatus();
    }
  }, [user]);

  const followUser = async () => {
    try {
      await followUserService(user, token);
      setIsFollowing(true);
    } catch (err) {
      const error = getFollowErrorMessage(err, "post");
      toast.error(error);
    }
  };

  const unfollowUser = async () => {
    try {
      await unfollowUserService(user, token);
      setIsFollowing(false);
    } catch (err) {
      const error = getFollowErrorMessage(err, "post");
      toast.error(error);
    }
  };

  return { isFollowing, followUser, unfollowUser };
}

export default useFollowStatus;
