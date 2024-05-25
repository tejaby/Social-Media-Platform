export const getUserErrorMessage = (error, method) => {
  if (method === "create") {
    if (error.data.username) {
      return "Un usuario con ese nombre ya existe.";
    }
  } else if (method === "update") {
    if (error.data.detail) {
      return "Token inválido o caducado al actualizar biografía";
    }
  } else if (method === "search") {
    if (error.data.detail) {
      return "El token no es válido o ha caducado al intentar buscar un usuario";
    }
  }
};

export const getAuthErrorMessage = (error, method) => {
  if (method === "login") {
    return error.data.error;
  } else if (method === "logout") {
    return error.data.error;
  } else if (method === "refresh") {
    if (error.data.detail) {
      return "El token no es válido o ha caducado";
    }
  }
};

export const getPostErrorMessage = (error, method) => {
  if (method === "get") {
    if (error.data.detail) {
      return "Token inválido o caducado al intentar obtener posts";
    }
  } else if (method === "create") {
    if (error.data.detail) {
      return "Token inválido o caducado al intentar crear post";
    }
  } else if (method === "delete") {
    if (error.data.detail) {
      return "Token inválido o caducado al intentar eliminar post";
    }
  } else if (method === "deactivate") {
    if (error.data.detail) {
      return "Token inválido o caducado al intentar archivar post";
    }
  }
};
