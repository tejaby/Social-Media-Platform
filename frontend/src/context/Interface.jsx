// react
import { createContext, useState } from "react";

export const InterfaceContext = createContext();

export function InterfaceContextProvider({ children }) {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <InterfaceContext.Provider value={{ showLogin, setShowLogin }}>
      {children}
    </InterfaceContext.Provider>
  );
}
