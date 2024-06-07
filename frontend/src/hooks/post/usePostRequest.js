// libraries
import toast from "react-hot-toast";

// context
import { UserContext } from "../../context/User";

// utils
import { getPostErrorMessage } from "../../utils/getErrorMessage";

// react
import { useContext } from "react";

export const usePostRequest = () => {
  const { setUser, setToken } = useContext(UserContext);

  const executeRequest = async (
    service,
    contextSetter,
    contextSetterPage,
    setterCount = null,
    token = null
  ) => {
    try {
      const response = await service(token);
      contextSetter(response.results);
      contextSetterPage(response.next);
      if (!!setterCount) {
        setterCount(response.count);
      }
    } catch (err) {
      const errorMessage = getPostErrorMessage(err, "get");
      toast.error(errorMessage);
      setTimeout(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
      }, 5000);
    }
  };

  return { executeRequest };
};
