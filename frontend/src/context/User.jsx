// react
import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  // Estado para almacenar la información del usuario
  const [user, setUser] = useState(() => {
    return localStorage.getItem("authUser")
      ? JSON.parse(localStorage.getItem("authUser"))
      : null;
  });

  // Estado para almacenar el token de autenticación
  const [token, setToken] = useState(() => {
    return localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null;
  });

  // Estado para almacenar la información de un usuario seleccionado para previsualización
  const [viewUser, setViewUser] = useState(null);

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, viewUser, setViewUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
