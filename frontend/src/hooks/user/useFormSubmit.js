// context
import { UserContext } from "../../context/User";

// react
import { useState, useContext } from "react";

const useFormSubmit = (submitFunction) => {
  const { setUser, setToken } = useContext(UserContext);

  // Estado para almacenar errores en la operación de envío del formulario
  const [error, setError] = useState(null);

  const onSubmit = async (action, token = null, data = null, user = null) => {
    try {
      let response;
      if (action == "login" || action == "create") {
        response = await submitFunction(data);
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem("authUser", JSON.stringify(response.user));
        localStorage.setItem("authToken", JSON.stringify(response.token));
      } else if (action == "update") {
        if (!token || !data) {
          throw new Error(
            "Se requieren token y datos para la acción de actualización."
          );
        }
        response = await submitFunction(user, data, token);
        setUser(response);
        localStorage.setItem("authUser", JSON.stringify(response));
      } else if (action == "logout") {
        await submitFunction(data);
        setUser(null);
        setToken(null);
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
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
