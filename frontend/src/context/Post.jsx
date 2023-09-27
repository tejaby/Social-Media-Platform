// components
import createPostConfig from "../components/form/post/createPostConfig";

// react
import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostContextProvider({ children }) {
  const { register, errors, reset, handleSubmit } = createPostConfig();

  const [allPosts, setAllPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);

  return (
    <PostContext.Provider
      value={{
        allPosts,
        setAllPosts,
        userPosts,
        setUserPosts,
        followingPosts,
        setFollowingPosts,
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
