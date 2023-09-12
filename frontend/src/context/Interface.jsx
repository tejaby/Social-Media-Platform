// hooks
import useToggleModalPost from "../hooks/interface/useToggleModalPost";

// react
import { createContext, useState } from "react";

export const InterfaceContext = createContext();

export function InterfaceContextProvider({ children }) {
  // componente mostrar modal createpost
  const { toggleShowModal, showModal } = useToggleModalPost();

  // mostrar login o register
  const [showLogin, setShowLogin] = useState(true);

  // mostrar ImagePreviewAndCaption
  const [condition, setCondition] = useState(false);

  return (
    <InterfaceContext.Provider
      value={{
        showLogin,
        setShowLogin,
        toggleShowModal,
        showModal,
        condition,
        setCondition,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
}
