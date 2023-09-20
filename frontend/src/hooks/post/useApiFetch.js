// services
import { getPosts } from "../../services/post";

// context
import { PostContext } from "../../context/Post";

// hooks
import useTokenValidation from "../user/useTokenValidation";

// react
import { useContext, useEffect, useState } from "react";

function useApiFetch() {
  const { setPost } = useContext(PostContext);

  const token = useTokenValidation();

  const [error, setError] = useState(null);

  const fetchDataFromApi = async () => {
    if (token) {
      try {
        const response = await getPosts(token);
        setPost(response);
        setError(null);
      } catch (e) {
        setError(e.data);
      }
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return { error };
}

export default useApiFetch;
