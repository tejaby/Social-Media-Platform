// libraries
import toast from "react-hot-toast";

// context
import { UserContext } from "../../context/User";

// utils
import { getUserErrorMessage } from "../../utils/getErrorMessage";

// react
import { useContext } from "react";

export const useUserRequest = (service) => {
  const { setUser, setToken } = useContext(UserContext);

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
      const errorMessage = getUserErrorMessage(err, method);
      toast.error(errorMessage);
      if (err.data.detail) {
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
