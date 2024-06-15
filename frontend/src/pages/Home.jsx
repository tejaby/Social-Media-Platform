// services
import { listFollowedPostsService } from "../services/post";

// components
import Form from "../components/form/user/Form";
import PostCard from "../components/home/PostCard";
import Spinner from "../components/ui/Spinner";

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

  const { executeRequest, postsLoading } = usePostRequest();

  if (!token) {
    return <Form />;
  }

  useEffect(() => {
    if (token && !loading) {
      executeRequest(
        listFollowedPostsService,
        setFollowedPosts,
        setNextPageFollowedPosts,
        null,
        token.access
      );
    }
  }, [token, loading]);

  return !postsLoading ? (
    <div className="max-w-lg sm:max-w-xl mx-auto sm:my-2">
      <PostCard />
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-white dark:bg-DarkColor">
      <Spinner />
    </div>
  );
}

export default Home;
