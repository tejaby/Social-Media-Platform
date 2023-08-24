// context
import { UserContext } from "../../context/User";

// hooks
import useTokenLocalStorage from "./useTokenLocalStorage ";

// react
import { useState, useContext } from "react";

const useSubmitForm = (submitFunction) => {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const { setToken, removeToken } = useTokenLocalStorage("userToken");

  const onSubmit = async (data, action) => {
    try {
      const response = await submitFunction(data);
      if (action == "login") {
        setToken(response.token);
        setUser(response);
      } else if (action == "create") {
        setToken(response.token);
        setUser(response);
      } else if (action == "logout") {
        removeToken();
        setUser(null);
      }
      setError(null);
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };

  return { error, onSubmit };
};

export default useSubmitForm;
