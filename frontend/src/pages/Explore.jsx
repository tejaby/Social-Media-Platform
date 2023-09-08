// components
import Posts from "../components/Posts";

// hooks
import useApiFetch from "../hooks/useApiFetch";

// react
import React from "react";

function Explore() {
  const post = useApiFetch();

  return (
    <>
      <div>Explore - private</div>
      <Posts post={post} />
    </>
  );
}

export default Explore;
