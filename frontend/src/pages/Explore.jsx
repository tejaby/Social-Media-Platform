// services
import { listPostService } from "../services/post";

// components
import ExploreGrid from "../components/explore/ExploreGrid";

// context
import { PostContext } from "../context/Post";

// hooks
import useApiFetch from "../hooks/post/useApiFetch";

// react
import { useContext } from "react";

function Explore() {
  const { setPosts, setNextPagePosts } = useContext(PostContext);

  const { error } = useApiFetch(listPostService, setPosts, setNextPagePosts);

  return (
    <div className="max-w-3xl mx-auto sm:my-2">
      <ExploreGrid />
    </div>
  );
}

export default Explore;
