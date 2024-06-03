// services
import { listUserPostService } from "../services/post";

// components
import Form from "../components/form/user/Form";
import PostCard from "../components/home/PostCard";

// context
import { UserContext } from "../context/User";
import { PostContext } from "../context/Post";

// hooks
import { usePostRequest } from "../hooks/post/usePostRequest";

// react
import { useContext, useEffect } from "react";

function Home() {
  const { token, loading } = useContext(UserContext);

  const { setFollowedPosts, setNextPageFollowedPosts } =
    useContext(PostContext);

  const { executeRequest } = usePostRequest();

  if (!token) {
    return <Form />;
  }

  useEffect(() => {
    if (token && !loading) {
      executeRequest(
        listUserPostService,
        setFollowedPosts,
        setNextPageFollowedPosts,
        token.access
      );
    }
  }, [token, loading]);

  return (
    <div className="max-w-lg sm:max-w-xl mx-auto sm:my-2">
      <PostCard />
    </div>
  );
}

export default Home;
