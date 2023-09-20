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

  const onSubmit = async (data, action) => {
    try {
      const response = await submitFunction(data);
      if (action == "login") {
        setToken(response.token);
        setUser(response.user);
      } else if (action == "create") {
        setToken(response.token);
        setUser(response.user);
      } else if (action == "logout") {
        removeToken();
        setUser(null);
      }
      setError(null);
    } catch (e) {
      setError(e);
    }
  };

  return { error, onSubmit };
};

export default useFormSubmit;
