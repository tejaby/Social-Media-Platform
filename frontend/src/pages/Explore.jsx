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
  const { token } = useContext(UserContext);
  const { setPosts, setNextPagePosts } = useContext(PostContext);

  const { executeRequest } = usePostRequest(listPostService);

  useEffect(() => {
    if (token) {
      executeRequest(setPosts, setNextPagePosts, token.access);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <ExploreGrid />
    </div>
  );
}

export default Explore;
