// react
import { createContext, useState } from "react";

export const InterfaceContext = createContext();

export function InterfaceContextProvider({ children }) {
  const [showLogin, setShowLogin] = useState(true);
  const [isModalPost, setIsModalPost] = useState(false);
  return (
    <InterfaceContext.Provider
      value={{ showLogin, setShowLogin, isModalPost, setIsModalPost }}
    >
      {children}
    </InterfaceContext.Provider>
  );
}
