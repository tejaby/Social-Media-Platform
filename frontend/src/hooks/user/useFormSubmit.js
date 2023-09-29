// context
import { UserContext } from "../../context/User";

// hooks
import useTokenLocalStorage from "./useTokenLocalStorage";

// react
import { useState, useContext } from "react";

const useFormSubmit = (submitFunction) => {
  const { setUser } = useContext(UserContext);

  const { setToken, removeToken } = useTokenLocalStorage("userToken");

  const [error, setError] = useState(null);

  const onSubmit = async (action, token = null, data = null) => {
    try {
      let response;
      if (action == "login" || action == "create") {
        response = await submitFunction(data);
        setToken(response.token);
        setUser(response);
      } else if (action == "update") {
        if (!token || !data) {
          throw new Error(
            "Se requieren token y datos para la acción de actualización."
          );
        }
        response = await submitFunction(token, data);
        setUser(response);
      } else if (action == "logout") {
        await submitFunction(token);
        removeToken();
        setUser(null);
      }
      setError(null);
    } catch (e) {
      setError(e);
      throw new Error(e);
    }
  };

  return { error, onSubmit };
};

export default useFormSubmit;
