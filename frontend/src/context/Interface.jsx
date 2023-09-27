// react
import { createContext, useState } from "react";

export const InterfaceContext = createContext();

export function InterfaceContextProvider({ children }) {
  // mostrar login o register
  const [showLogin, setShowLogin] = useState(true);

  // show modalCreatePost
  const [showModal, setShowModal] = useState(false);

  // mostrar ImagePreviewAndCaption
  const [condition, setCondition] = useState(false);

  return (
    <InterfaceContext.Provider
      value={{
        showLogin,
        setShowLogin,
        showModal,
        setShowModal,
        condition,
        setCondition,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
}
