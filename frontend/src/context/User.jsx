import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [data, setData] = useState("");

  const login = (v) => {
    setData(v);
  };

  const logout = () => {
    setData("");
  };

  return (
    <UserContext.Provider value={{ login, logout, data }}>
      {children}
    </UserContext.Provider>
  );
}
