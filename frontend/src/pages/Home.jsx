// services
import { user_posts } from "../services/post";

// components
import Form from "../components/form/user/Form";
import HomePostsList from "../components/post/grid/HomePostsList";

// context
import { UserContext } from "../context/User";
import { PostContext } from "../context/Post";

// hooks
import useApiFetch from "../hooks/post/useApiFetch";

// react
import { useContext } from "react";

function Home() {
  const { user } = useContext(UserContext);
  const { setFollowingPosts } = useContext(PostContext);

  const { error } = useApiFetch(user_posts, setFollowingPosts);

  if (!user) {
    return <Form />;
  }

  return (
    <div className="max-w-lg sm:max-w-xl mx-auto sm:my-2">
      <HomePostsList />
    </div>
  );
}

export default Home;
