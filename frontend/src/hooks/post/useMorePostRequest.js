// libraries
import toast from "react-hot-toast";

// context
import { UserContext } from "../../context/User";

// react
import { useState, useContext } from "react";

// utils
import { getPostErrorMessage } from "../../utils/getErrorMessage";

export const useMorePostRequest = () => {
  const { setUser, setToken } = useContext(UserContext);

  // Estado para indicar si los datos están siendo cargados
  const [loading, setLoading] = useState(false);

  const executeRequest = async (
    service,
    context,
    contextSetter,
    contextSetterPage,
    nextPageUrl,
    token = null
  ) => {
    try {
      setLoading(true);
      const response = await service(nextPageUrl, token);
      contextSetter([...context, ...response.results]);
      contextSetterPage(response.next);
    } catch (err) {
      const errorMessage = getPostErrorMessage(err);
      toast.error(errorMessage);
      setTimeout(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };
  return { executeRequest, loading };
};
