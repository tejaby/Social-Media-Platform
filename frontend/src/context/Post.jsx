// components
import createPostConfig from "../components/form/post/createPostConfig";

// react
import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostContextProvider({ children }) {
  const { register, errors, reset, handleSubmit } = createPostConfig();

  const [post, setPost] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);

  return (
    <PostContext.Provider
      value={{
        post,
        setPost,
        userPost,
        setUserPost,
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
