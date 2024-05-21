// libraries
import toast from "react-hot-toast";

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
  const { token, setViewUser } = useContext(UserContext);

  const { username } = useParams();

  const [currentPosts, setCurrentPosts] = useState([]);
  const [nextPageCurrentPosts, setNextPageCurrentPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await listUsersService(username, token.access);
        const user = userResponse.results.find(
          (user) => user.username === username
        );
        if (user) {
          setViewUser(user);
        }
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
