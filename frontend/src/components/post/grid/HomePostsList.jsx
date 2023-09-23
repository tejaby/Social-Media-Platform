// context
import { PostContext } from "../../../context/Post";

import { useContext } from "react";

function HomePostsList() {
  const { followingPosts } = useContext(PostContext);

  return (
    <div className="grid grid-cols-1 gap-1 md:gap-2 sm:pt-2">
      {followingPosts.map((post) => (
        <div key={post.id} className="min-h-screen max-h-screen">
          <img src={post.image} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

export default HomePostsList;
