// services
import { getPosts } from "../services/post";

// context
import { PostContext } from "../context/Post";

// hooks
import useTokenValidation from "../hooks/user/useTokenValidation";

// react
import { useContext, useEffect } from "react";

function useApiFetch() {
  const { setPost } = useContext(PostContext);

  const token = useTokenValidation();

  const fetchDataFromApi = async () => {
    if (token) {
      try {
        const response = await getPosts(token);
        setPost(response);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return;
}

export default useApiFetch;
