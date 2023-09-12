// components
import createPostConfig from "../components/form/post/createPostConfig";

// react
import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostContextProvider({ children }) {
  const { schema } = createPostConfig();

  // posts explore
  const [post, setPost] = useState([]);

  // createpost
  const [cover, setCover] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  return (
    <PostContext.Provider
      value={{
        post,
        setPost,
        cover,
        setCover,
        image,
        setImage,
        content,
        setContent,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
