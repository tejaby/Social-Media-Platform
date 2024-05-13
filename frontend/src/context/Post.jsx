// components
import createPostConfig from "../components/form/post/createPostConfig";

// react
import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostContextProvider({ children }) {
  const { register, errors, reset, handleSubmit } = createPostConfig();

  const [post, setPost] = useState([]);
  const [nextPagePost, setNextPagePost] = useState(null);
  const [userPost, setUserPost] = useState([]);
  const [nextPagePostUser, setNextPagePostUser] = useState(null);
  const [followingPosts, setFollowingPosts] = useState([]);

  return (
    <PostContext.Provider
      value={{
        post,
        setPost,
        nextPagePost,
        setNextPagePost,
        userPost,
        setUserPost,
        nextPagePostUser,
        setNextPagePostUser,
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
