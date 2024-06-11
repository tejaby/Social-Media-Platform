// libraries
import { useLocation } from "react-router-dom";

// context
import { PostContext } from "../../context/Post";

// react
import { useContext } from "react";

function usePostManagement() {
  const {
    posts,
    setPosts,
    userPosts,
    setUserPosts,
    archivedPosts,
    setArchivedPosts,
  } = useContext(PostContext);

  const location = useLocation();

  const updatePostState = (post) => {
    if (location.pathname === "/profile") {
      setUserPosts((prevPosts) => [post, ...prevPosts]);
    } else if (location.pathname === "/explore") {
      setPosts((prevPosts) => [post, ...prevPosts]);
    }
  };

  const deletePostState = (postId) => {
    if (location.pathname === "/profile") {
      setUserPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
      );
      setArchivedPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
      );
    } else if (location.pathname === "/explore") {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    }
  };

  const movePostToArchived = (postId) => {
    let post = null;
    if (location.pathname === "/profile") {
      post = userPosts.find((p) => p.id === postId);
      if (post) {
        post = { ...post, state: false };
        setUserPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
        setArchivedPosts((prevPosts) => [post, ...prevPosts]);
      }
    } else if (location.pathname === "/explore") {
      post = posts.find((p) => p.id === postId);
      if (post) {
        post = { ...post, state: false };
        setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
      }
    }
  };

  const movePostToActive = (postId) => {
    const post = archivedPosts.find((p) => p.id === postId);
    if (post) {
      const activePost = { ...post, state: true };
      setArchivedPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
      setUserPosts((prevPosts) => [activePost, ...prevPosts]);
    }
  };

  return {
    updatePostState,
    deletePostState,
    movePostToArchived,
    movePostToActive,
  };
}

export default usePostManagement;
