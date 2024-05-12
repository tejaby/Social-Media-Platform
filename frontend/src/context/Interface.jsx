// react
import { createContext, useState } from "react";

export const InterfaceContext = createContext();

export function InterfaceContextProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("darkMode")
      ? localStorage.getItem("darkMode")
      : "light";
  });

  // mostrar login o register
  const [showLogin, setShowLogin] = useState(true);

  // show showModal
  const [showModal, setShowModal] = useState(false);

  const [showModalProfile, setShowModalProfile] = useState(false);
  const [showModalPost, setShowModalPost] = useState(false);

  // mostrar ImagePreviewAndCaption
  const [condition, setCondition] = useState(false);

  return (
    <InterfaceContext.Provider
      value={{
        showLogin,
        setShowLogin,
        showModal,
        setShowModal,
        showModalProfile,
        setShowModalProfile,
        showModalPost,
        setShowModalPost,
        condition,
        setCondition,
        theme,
        setTheme,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
}
