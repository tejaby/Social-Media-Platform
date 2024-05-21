// context
import { UserContext } from "../../context/User";

// react
import { useState, useContext } from "react";

export const useUserRequest = (service) => {
  const { setUser, setToken } = useContext(UserContext);

  const [error, setError] = useState(null);

  const executeRequest = async (
    method,
    data = null,
    token = null,
    id = null
  ) => {
    let response;
    try {
      if (method === "create") {
        response = await service(data);
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem("authUser", JSON.stringify(response.user));
        localStorage.setItem("authToken", JSON.stringify(response.token));
      } else if (method === "update") {
        response = await service(id, data, token);
        setUser(response);
        localStorage.setItem("authUser", JSON.stringify(response));
      }
    } catch (err) {
      setError(err);
    }
  };

  return { executeRequest, error };
};
