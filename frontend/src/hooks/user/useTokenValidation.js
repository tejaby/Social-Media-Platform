// hooks
import useTokenLocalStorage from "./useTokenLocalStorage";

function useTokenValidation() {
  const { getToken } = useTokenLocalStorage("userToken");

  const token = getToken();
  if (token) {
    return token;
  }
}

export default useTokenValidation;
