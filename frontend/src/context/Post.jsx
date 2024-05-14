// components
import createPostConfig from "../components/form/post/createPostConfig";

// react
import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostContextProvider({ children }) {
  const { register, errors, reset, handleSubmit } = createPostConfig();

  const [posts, setPosts] = useState([]);
  const [nextPagePosts, setNextPagePosts] = useState(null);

  const [userPosts, setUserPosts] = useState([]);
  const [nextPageUserPosts, setNextPageUserPosts] = useState(null);

  const [followedPosts, setFollowedPosts] = useState([]);
  const [nextPageFollowedPosts, setNextPageFollowedPosts] = useState(null);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        nextPagePosts,
        setNextPagePosts,

        userPosts,
        setUserPosts,
        nextPageUserPosts,
        setNextPageUserPosts,

        followedPosts,
        setFollowedPosts,
        nextPageFollowedPosts,
        setNextPageFollowedPosts,

        register,
        errors,
        reset,
        handleSubmit,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
