// services
import { listPostsByUseridService } from "../services/post";
import { useParams } from "react-router-dom";

// components
import UserDetailProfile from "../components/profile/UserDetailProfile ";

// context
import { UserContext } from "../context/User";

// react
import { useContext, useState, useEffect } from "react";

function UserDetail() {
  const { token } = useContext(UserContext);

  const { username } = useParams();

  const [currentPosts, setCurrentPosts] = useState([]);
  const [nextPageCurrentPosts, setNextPageCurrentPosts] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listPostsByUseridService(username, token.access);
        setCurrentPosts(response.results);
        setNextPageCurrentPosts(response.next);
        setUser(response.results[0].author);
      } catch (err) {
        console.error(err);
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
        stateUser={user}
      />
    </div>
  );
}

export default UserDetail;
