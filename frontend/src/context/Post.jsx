// react
import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostContextProvider({ children }) {
  const [post, setPost] = useState([]);

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
}
