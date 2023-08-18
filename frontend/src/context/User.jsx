import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [data, setData] = useState("user");
  return (
    <UserContext.Provider value={{ data }}>{children}</UserContext.Provider>
  );
}
