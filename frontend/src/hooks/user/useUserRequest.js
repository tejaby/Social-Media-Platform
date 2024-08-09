// libraries
import toast from "react-hot-toast";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";

// utils
import { getUserErrorMessage } from "../../utils/getErrorMessage";

// react
import { useContext } from "react";

export const useUserRequest = (service) => {
  const { showLogin, setShowLogin } = useContext(InterfaceContext);
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
        setShowLogin(!showLogin);
      } else if (method === "update") {
        response = await service(id, data, token);
        toast.success("¡Tus datos se han actualizado exitosamente!", {
          duration: 5000,
        });
        setUser(response);
        localStorage.setItem("authUser", JSON.stringify(response));
      }
    } catch (err) {
      const errorMessage = getUserErrorMessage(err, method);
      toast.error(errorMessage);
    }
  };

  return { executeRequest };
};
