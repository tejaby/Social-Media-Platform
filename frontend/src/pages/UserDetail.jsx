// libraries
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// services
import { listPostsByUseridService } from "../services/post";
import { listUsersService } from "../services/user";
import { listFollowersService, listFollowingService } from "../services/follow";

// components
import UserDetailProfile from "../components/profile/UserDetailProfile ";

// context
import { UserContext } from "../context/User";
import { PostContext } from "../context/Post";

// hooks
import useFetchFollowData from "../hooks/follow/useFetchFollowData";

// utils
import { getUserErrorMessage } from "../utils/getErrorMessage";

// react
import { useContext, useState, useEffect } from "react";

function UserDetail() {
  const { user, token, viewUser, setViewUser, loading } =
    useContext(UserContext);

  const { setCurrentPosts, setNextPageCurrentPosts } = useContext(PostContext);

  const { username } = useParams();

  const navigate = useNavigate();

  // Estado para almacenar el total de posts
  const [userPostCount, setUserPostCount] = useState(0);

  const [postsLoading, setPostsLoading] = useState(true);

  const { data: followers, loading: followersLoading } = useFetchFollowData(
    listFollowersService,
    viewUser?.id,
    token.access
  );
  const { data: following, loading: followingLoading } = useFetchFollowData(
    listFollowingService,
    viewUser?.id,
    token.access
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await listUsersService(username, token.access);
        const user_current = userResponse.results.find(
          (user) => user.username === username
        );
        if (!user_current) {
          navigate("*");
          return;
        }
        if (user_current.id === user.id) {
          navigate("/profile");
        }
        setViewUser(user_current);
        const postsResponse = await listPostsByUseridService(
          username,
          token.access
        );
        setCurrentPosts(postsResponse.results);
        setNextPageCurrentPosts(postsResponse.next);
        setUserPostCount(postsResponse.count);
      } catch (err) {
        const errorMessage = getUserErrorMessage(err, "search");
        toast.error(errorMessage, { duration: 5000 });
        return;
      } finally {
        setPostsLoading(false);
      }
    };

    if (token && !loading) {
      fetchData();
    }
  }, [token, loading, navigate]);

  return (
    <div className="max-w-3xl mx-auto mb-16 sm:my-2">
      <UserDetailProfile
        userPostCount={userPostCount}
        followers={followers}
        followersLoading={followersLoading}
        following={following}
        followingLoading={followingLoading}
        postsLoading={postsLoading}
      />
    </div>
  );
}

export default UserDetail;
