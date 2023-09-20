// components
import createPostConfig from "../components/form/post/createPostConfig";

// hooks
import useFileReader from "../hooks/post/useFileReader";

// react
import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostContextProvider({ children }) {
  const { register, errors, reset, handleSubmit } = createPostConfig();

  const { handleChangeFile, cover, setCover } = useFileReader();

  const [allPosts, setAllPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  return (
    <PostContext.Provider
      value={{
        allPosts,
        setAllPosts,
        userPosts,
        setUserPosts,
        register,
        errors,
        reset,
        handleSubmit,
        handleChangeFile,
        cover,
        setCover,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
