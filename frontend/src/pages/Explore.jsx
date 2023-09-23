// services
import { getPosts } from "../services/post";

// components
import ExplorePostsList from "../components/post/grid/ExplorePostsList";

// context
import { PostContext } from "../context/Post";

// hooks
import useApiFetch from "../hooks/post/useApiFetch";

// react
import { useContext } from "react";

function Explore() {
  const { setAllPosts } = useContext(PostContext);

  const { error } = useApiFetch(getPosts, setAllPosts);

  return (
    <div className="max-w-3xl mx-auto sm:my-2">
      <ExplorePostsList />
    </div>
  );
}

export default Explore;
