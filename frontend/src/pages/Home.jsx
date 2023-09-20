// services
import { user_posts } from "../services/post";

// components
import Form from "../components/form/user/Form";
import UserPostsList from "../components/post/UserPostsList";

// context
import { UserContext } from "../context/User";
import { PostContext } from "../context/Post";

// hooks
import useApiFetch from "../hooks/post/useApiFetch";

// react
import { useContext } from "react";

function Home() {
  const { user } = useContext(UserContext);
  const { setUserPosts } = useContext(PostContext);

  const { error } = useApiFetch(user_posts, setUserPosts);

  if (!user) {
    return <Form />;
  }

  return (
    <div className="container mx-auto">
      <UserPostsList />
    </div>
  );
}

export default Home;
