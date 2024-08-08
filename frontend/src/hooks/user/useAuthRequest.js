// libraries
import toast from "react-hot-toast";

// context
import { UserContext } from "../../context/User";

// utils
import { getAuthErrorMessage } from "../../utils/getErrorMessage";

// react
import { useContext } from "react";

export const useAuthRequest = (service) => {
  const { setUser, setToken } = useContext(UserContext);

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
      const { status, data } = err;
      if (
        status != 403 &&
        data.error !==
          "La cuenta está desactivada. Por favor, contacta al administrador."
      ) {
        const errorMessage = getAuthErrorMessage(err, method);
        toast.error(errorMessage, { duration: 5000 });
      }

      if (method === "login") {
        throw err;
      }

      if (method !== "login") {
        setTimeout(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("authUser");
          localStorage.removeItem("authToken");
        }, 5000);
      }
    }
  };

  return { executeRequest };
};
