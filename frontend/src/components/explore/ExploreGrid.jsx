// components
import PostGrid from "../../components/post/grid/PostGrid";

// context
import { PostContext } from "../../context/Post";

// react
import { useContext } from "react";

function ExploreGrid() {
  const { post } = useContext(PostContext);
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-2 sm:pt-2">
      {post.map((post) => {
        return (
          <PostGrid key={post.id} src={post.image} alt={post.author.username} />
        );
      })}
    </div>
  );
}

export default ExploreGrid;
