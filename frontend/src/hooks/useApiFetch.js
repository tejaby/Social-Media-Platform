// services
import { getProducts } from "../services/post";

// hooks
import useTokenValidation from "../hooks/user/useTokenValidation";

// react
import { useEffect, useState } from "react";

function useApiFetch() {
  const [post, setPost] = useState([]);

  const token = useTokenValidation();

  const fetchDataFromApi = async () => {
    if (token) {
      try {
        const response = await getProducts(token);
        setPost(response);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return post;
}

export default useApiFetch;
