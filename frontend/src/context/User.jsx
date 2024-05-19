// react
import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("authUser")
      ? JSON.parse(localStorage.getItem("authUser"))
      : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null;
  });

  const [viewUser, setViewUser] = useState(null);

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, viewUser, setViewUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
