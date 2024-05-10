// services
// import { getPosts } from "../services/post";
import { listUserPostService } from "../services/post";

// components
import Form from "../components/form/user/Form";
import PostCard from "../components/home/PostCard";

// context
import { UserContext } from "../context/User";
import { PostContext } from "../context/Post";

// hooks
import useApiFetch from "../hooks/post/useApiFetch";

// react
import { useContext } from "react";

function Home() {
  const { user } = useContext(UserContext);
  const { setPost } = useContext(PostContext);

  const { error } = useApiFetch(listUserPostService, setPost);

  if (!user) {
    return <Form />;
  }

  return (
    <div className="max-w-lg sm:max-w-xl mx-auto sm:my-2">
      <PostCard />
    </div>
  );
}

export default Home;
