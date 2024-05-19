// react
import { createContext, useState } from "react";

export const InterfaceContext = createContext();

export function InterfaceContextProvider({ children }) {
  // Estado para almacenar la preferencia del tema (light o dark)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("darkMode")
      ? localStorage.getItem("darkMode")
      : "light";
  });

  // Estado para mostrar el formulario de inicio de sesión (true) o registro (false)
  const [showLogin, setShowLogin] = useState(true);

  // Estado para mostrar u ocultar el componente modal
  const [showModal, setShowModal] = useState(false);

  // Estado para mostrar u ocultar el modal de edición de perfil
  const [showModalProfile, setShowModalProfile] = useState(false);

  // Estado para mostrar u ocultar el modal para crear un post
  const [showModalPost, setShowModalPost] = useState(false);

  // Estado para mostrar u ocultar el modal para visualizar un post
  const [showViewPost, setShowViewPost] = useState(false);

  // Estado para variar el contenido del modal showModalPost:
  const [condition, setCondition] = useState(false);

  return (
    <InterfaceContext.Provider
      value={{
        theme,
        setTheme,
        showLogin,
        setShowLogin,
        showModal,
        setShowModal,
        showModalProfile,
        setShowModalProfile,
        showModalPost,
        setShowModalPost,
        showViewPost,
        setShowViewPost,
        condition,
        setCondition,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
}
