// components
import Posts from "../components/Posts";

// hooks
import useApiFetch from "../hooks/useApiFetch";

// react
import React from "react";

function Explore() {
  const post = useApiFetch();

  return (
    <div className="container mx-auto">
      <Posts post={post} />
    </div>
  );
}

export default Explore;
