// context
import { UserContext } from "../../context/User";

// hooks
// import useTokenValidation from "../user/useTokenValidation";

// react
import { useEffect, useState, useContext } from "react";

function useApiFetch(fetchFunction, contextSetter) {
  const { setUser, token, setToken } = useContext(UserContext);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFunction(token.access);
        contextSetter(response);
        setError(null);
      } catch (err) {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
        setError(err.data);
      }
    };

    if (token && token.access) {
      fetchData();
    }
  }, []);

  return { error };
}

export default useApiFetch;
