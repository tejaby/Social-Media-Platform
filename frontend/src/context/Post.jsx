// components
import createPostConfig from "../components/form/post/createPostConfig";

// hooks
import useFileReader from "../hooks/post/useFileReader";

// react
import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostContextProvider({ children }) {
  const { register, errors, handleSubmit } = createPostConfig();

  const { handleChangeFile, cover, setCover } = useFileReader();

  const [post, setPost] = useState([]);

  return (
    <PostContext.Provider
      value={{
        post,
        setPost,
        register,
        errors,
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
