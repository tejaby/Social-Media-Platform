// context
import { UserContext } from "../../context/User";

// react
import { useState, useContext } from "react";

export const useAuthRequest = (service) => {
  const { setUser, setToken } = useContext(UserContext);

  const [error, setError] = useState(null);

  const executeRequest = async (method, data = null, token = null) => {
    let response;
    try {
      if (method === "login") {
        response = await service(data);
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem("authUser", JSON.stringify(response.user));
        localStorage.setItem("authToken", JSON.stringify(response.token));
      } else if (method === "logout") {
        response = await service(token);
        setUser(null);
        setToken(null);
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
      } else if (method === "refresh") {
        response = await service(token);
        setToken(response);
        localStorage.setItem("authToken", JSON.stringify(response));
      }
    } catch (err) {
      setError(err);
    }
  };

  return { executeRequest, error };
};
