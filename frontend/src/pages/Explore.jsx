// services
import { getPosts } from "../services/post";

// components
import PostsList from "../components/post/PostsList";

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
    <div className="container mx-auto">
      <PostsList />
    </div>
  );
}

export default Explore;
