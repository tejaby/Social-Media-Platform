// libraries
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// libraries
import { useParams } from "react-router-dom";

// services
import { listPostsByUseridService } from "../services/post";
import { listUsersService } from "../services/user";

// components
import UserDetailProfile from "../components/profile/UserDetailProfile ";

// context
import { UserContext } from "../context/User";

// react
import { useContext, useState, useEffect } from "react";

function UserDetail() {
  const { user, token, setViewUser } = useContext(UserContext);

  const { username } = useParams();

  const navigate = useNavigate();

  const [currentPosts, setCurrentPosts] = useState([]);
  const [nextPageCurrentPosts, setNextPageCurrentPosts] = useState(null);

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
      } catch (err) {
        toast.error(err.data.detail);
        return;
      }
    };

    if (token && token.access) {
      fetchData();
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto sm:my-2">
      <UserDetailProfile
        statePosts={currentPosts}
        setStatePosts={setCurrentPosts}
        statePage={nextPageCurrentPosts}
        setStatePage={setNextPageCurrentPosts}
      />
    </div>
  );
}

export default UserDetail;
