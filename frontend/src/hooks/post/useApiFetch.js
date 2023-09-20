// hooks
import useTokenValidation from "../user/useTokenValidation";

// react
import { useEffect, useState } from "react";

function useApiFetch(fetchFunction, contextSetter) {
  const token = useTokenValidation();

  const [error, setError] = useState(null);

  const fetchDataFromApi = async () => {
    if (token) {
      try {
        const response = await fetchFunction(token);
        contextSetter(response);
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
