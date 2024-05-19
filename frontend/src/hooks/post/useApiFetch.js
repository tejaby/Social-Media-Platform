// context
import { UserContext } from "../../context/User";

// react
import { useEffect, useState, useContext } from "react";

function useApiFetch(fetchFunction, contextSetter, contextSetterPage) {
  const { setUser, token, setToken } = useContext(UserContext);

  // Estado para almacenar un error en caso de que ocurra durante la llamada a la API
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFunction(token.access);
        contextSetter(response.results);
        contextSetterPage(response.next);
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
