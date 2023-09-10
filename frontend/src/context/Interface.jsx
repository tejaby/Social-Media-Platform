// react
import { createContext, useState } from "react";

export const InterfaceContext = createContext();

export function InterfaceContextProvider({ children }) {
  const [showLogin, setShowLogin] = useState(true);
  const [isModalPost, setIsModalPost] = useState(false);
  const [isNextPost, setIsNextPost] = useState(false);
  return (
    <InterfaceContext.Provider
      value={{
        showLogin,
        setShowLogin,
        isModalPost,
        setIsModalPost,
        isNextPost,
        setIsNextPost,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
}
