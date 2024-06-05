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

// hooks
import useFetchFollowData from "../hooks/follow/useFetchFollowData";

// react
import { useContext, useState, useEffect } from "react";

function UserDetail() {
  const { user, token, viewUser, setViewUser, loading } =
    useContext(UserContext);

  const { username } = useParams();

  const navigate = useNavigate();

  // Estado para almacenar el total de posts
  const [userPostCount, setUserPostCount] = useState(0);

  const [currentPosts, setCurrentPosts] = useState([]);
  const [nextPageCurrentPosts, setNextPageCurrentPosts] = useState(null);

  const { data: followers, loading: followersLoading } = useFetchFollowData(
    listFollowersService,
    viewUser?.id,
    token
  );
  const { data: following, loading: followingLoading } = useFetchFollowData(
    listFollowingService,
    viewUser?.id,
    token
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
        toast.error(err.data.detail);
        return;
      }
    };

    if (token && !loading) {
      fetchData();
    }
  }, [token, loading]);

  return (
    <div className="max-w-3xl mx-auto sm:my-2">
      <UserDetailProfile
        statePosts={currentPosts}
        setStatePosts={setCurrentPosts}
        statePage={nextPageCurrentPosts}
        setStatePage={setNextPageCurrentPosts}
        userPostCount={userPostCount}
        followers={followers}
        followersLoading={followersLoading}
        following={following}
        followingLoading={followingLoading}
      />
    </div>
  );
}

export default UserDetail;
