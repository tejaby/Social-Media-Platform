import { useState, useContext } from "react";

import { UserContext } from "../../context/User";

import useTokenLocalStorage from "./useTokenLocalStorage ";

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
