// context
import { PostContext } from "../../context/Post";

// react
import { useContext } from "react";

function ExplorePostsList() {
  const { allPosts } = useContext(PostContext);
  return (
    <div className="max-w-3xl mx-auto my-3">
      <div className="grid grid-cols-3 gap-1 md:gap-2 sm:pt-2">
        {allPosts.map((p) => (
          <div key={p.id} className="h-48 sm:h-60 lg:h-72">
            <img src={p.image} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExplorePostsList;
