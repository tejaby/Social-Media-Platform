function useTokenLocalStorage(tokenkey) {
  const getToken = () => {
    return localStorage.getItem(tokenkey);
  };
  const setToken = (token) => {
    localStorage.setItem(tokenkey, token);
  };

  const removeToken = () => {
    localStorage.removeItem(tokenkey);
  };
  return { getToken, setToken, removeToken };
}

export default useTokenLocalStorage;
