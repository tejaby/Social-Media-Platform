// context
import { PostContext } from "../../../context/Post";

// react
import { useContext } from "react";

function ExplorePostsList() {
  const { post } = useContext(PostContext);
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-2 sm:pt-2">
      {post.map((post) => (
        <div key={post.id} className="h-48 sm:h-60 lg:h-72">
          <img src={post.image} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

export default ExplorePostsList;
