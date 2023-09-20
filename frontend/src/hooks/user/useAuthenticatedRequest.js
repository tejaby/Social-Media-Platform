// services
import { tokenValidation } from "../../services/user";

// context
import { UserContext } from "../../context/User";

// hooks
import useTokenValidation from "./useTokenValidation";
import useTokenLocalStorage from "./useTokenLocalStorage";

// react
import { useContext, useEffect, useState } from "react";

function useAuthenticatedRequest() {
  const { setUser } = useContext(UserContext);

  const { removeToken } = useTokenLocalStorage("userToken");
  const token = useTokenValidation();

  const [error, setError] = useState(null);

  const onSubmit = async () => {
    if (token) {
      try {
        const response = await tokenValidation(token);
        setUser(response.user);
        setError(null);
      } catch (e) {
        setError(e.data);
        removeToken();
      }
    }
  };

  useEffect(() => {
    onSubmit();
  }, []);

  return { error };
}

export default useAuthenticatedRequest;
