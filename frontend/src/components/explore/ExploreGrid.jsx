// libraries
import { useInView } from "react-intersection-observer";
import axios from "axios";

// components
import PostGrid from "../../components/post/grid/PostGrid";

// context
import { UserContext } from "../../context/User";
import { PostContext } from "../../context/Post";

// react
import { useContext, useEffect, useState } from "react";

function ExploreGrid() {
  const { setUser, token, setToken } = useContext(UserContext);
  const { posts, setPosts, nextPagePosts, setNextPagePosts } =
    useContext(PostContext);

  const { inView, ref } = useInView();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!nextPagePosts || loading) return;

    const loadMorePosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(nextPagePosts, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        });
        setPosts([...posts, ...response.data.results]);
        setNextPagePosts(response.data.next);
      } catch (err) {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    if (inView) {
      loadMorePosts();
    }
  }, [inView]);
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-2 sm:pt-2">
      {posts.map((post, index) => (
        <div key={post.id}>
          <PostGrid src={post.image} alt={post.author.username} />
          {index === posts.length - 1 && <div ref={ref} />}
        </div>
      ))}
    </div>
  );
}

export default ExploreGrid;
