// components
import createPostConfig from "../components/form/post/createPostConfig";

// react
import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostContextProvider({ children }) {
  const { register, errors, reset, handleSubmit } = createPostConfig();

  // Estados para publicaciones generales y el enlace a la siguiente página
  const [posts, setPosts] = useState([]);
  const [nextPagePosts, setNextPagePosts] = useState(null);

  // Estados para publicaciones del usuario autenticado y el enlace a la siguiente página
  const [userPosts, setUserPosts] = useState([]);
  const [nextPageUserPosts, setNextPageUserPosts] = useState(null);

  // Estados para publicaciones de usuarios seguidos y el enlace a la siguiente página
  const [followedPosts, setFollowedPosts] = useState([]);
  const [nextPageFollowedPosts, setNextPageFollowedPosts] = useState(null);

  // Estado para almacenar la información de una publicación seleccionada para previsualización
  const [viewPost, setViewPost] = useState(null);

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

        viewPost,
        setViewPost,

        // Funciones y estados del formulario de creación de publicaciones
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
