// services
import { listPostService } from "../services/post";

// components
import ExploreGrid from "../components/explore/ExploreGrid";

// context
import { UserContext } from "../context/User";
import { PostContext } from "../context/Post";

// hooks
import { usePostRequest } from "../hooks/post/usePostRequest";

// react
import { useContext, useEffect } from "react";

function Explore() {
  const { token, loading } = useContext(UserContext);
  const { setPosts, setNextPagePosts } = useContext(PostContext);

  const { executeRequest, postsLoading } = usePostRequest();

  useEffect(() => {
    if (token && !loading) {
      executeRequest(
        listPostService,
        setPosts,
        setNextPagePosts,
        null,
        token.access
      );
    }
  }, [token, loading]);

  return (
    <div className="max-w-3xl mx-auto mb-16">
      <ExploreGrid postsLoading={postsLoading} />
    </div>
  );
}

export default Explore;
