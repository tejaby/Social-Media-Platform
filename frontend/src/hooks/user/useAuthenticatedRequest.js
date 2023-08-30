// services
import { tokenValidation } from "../../services/user";

// context
import { UserContext } from "../../context/User";

// hooks
import useTokenValidation from "./useTokenValidation";

// react
import { useContext, useState } from "react";

function useAuthenticatedRequest() {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const token = useTokenValidation();

  const onSubmit = async () => {
    if (token) {
      try {
        const response = await tokenValidation(token);
        setUser(response);
        setError(null);
      } catch (e) {
        setError(e);
      }
    }
  };

  return { error, onSubmit };
}

export default useAuthenticatedRequest;
