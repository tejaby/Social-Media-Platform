// context
import { UserContext } from "../../context/User";

// hooks
// import useTokenValidation from "../user/useTokenValidation";

// react
import { useEffect, useState, useContext } from "react";

function useApiFetch(fetchFunction, contextSetter) {
  const { token } = useContext(UserContext);

  const [error, setError] = useState(null);

  const fetchDataFromApi = async () => {
    if (token) {
      try {
        const response = await fetchFunction(token.access);
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
