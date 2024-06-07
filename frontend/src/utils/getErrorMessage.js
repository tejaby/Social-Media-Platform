// error message for users
export const getUserErrorMessage = (error, method) => {
  if (method === "create") {
    if (error.data?.username) {
      return "Ya existe un usuario con ese nombre";
    }
  } else if (method === "update") {
    if (error.data?.detail) {
      if (error.data.detail === "Given token not valid for any token type") {
        return "Error al actualizar el usuario";
      } else if (error.data.detail === "Not found.") {
        return "Usuario no encontrado";
      }
    } else if (error.data?.username) {
      return "Ya existe un usuario con ese nombre";
    }
  } else if (method === "search") {
    if (error.data?.detail) {
      return "Error al realizar la búsqueda";
    }
  }
  return "Ha ocurrido un error inesperado";
};

// error message for authentication
export const getAuthErrorMessage = (error, method) => {
  if (method === "refresh") {
    if (error.data?.detail) {
      return "Tu sesión ha expirado. Por favor, vuelve a iniciar sesión";
    } else if (error.data?.refresh) {
      return "El Token de refresco es requerido";
    }
  } else if (method === "login") {
    if (
      error.data?.error ===
      "no se encontró ninguna cuenta activa con las credenciales proporcionadas"
    ) {
      return "Credenciales inválidas";
    }
  } else if (method === "logout") {
    if (error.data?.error) {
      if (error.data.error === "se requiere el token de actualización") {
        return "Error al cerrar sesión";
      } else if (error.data.error === "Token de refresco inválido") {
        return "Error al cerrar sesión";
      }
    }
  }
  return "Ha ocurrido un error inesperado";
};

// error message for posts
export const getPostErrorMessage = (error, method) => {
  if (method === "get") {
    if (error.data?.detail) {
      return "Error al cargar los posts";
    }
    return "Ha ocurrido un error inesperado";
  }
  if (method === "create") {
    if (error.data?.detail) {
      return "Error al crear el post";
    } else if (error.data?.content || error.data?.image) {
      return "La imagen y la descripción son requeridas";
    }
    return "Ha ocurrido un error inesperado";
  }
  if (method === "delete") {
    if (error.data?.detail) {
      if (error.data.detail === "Given token not valid for any token type") {
        return "Error al eliminar el post";
      } else if (error.data.detail === "Not found.") {
        return "Usuario no encontrado";
      }
    }
    return "Ha ocurrido un error inesperado";
  }
  if (method === "deactivate") {
    if (error.data?.detail) {
      if (error.data.detail === "Given token not valid for any token type") {
        return "Error al archivar el post";
      } else if (error.data.detail === "Not found.") {
        return "Usuario no encontrado";
      }
    }
    return "Usuario no encontrado";
  }
  if (method === "activate") {
    if (error.data?.detail) {
      if (error.data.detail === "Given token not valid for any token type") {
        return "Error al hacer visible el post";
      } else if (error.data.detail === "Not found.") {
        return "Usuario no encontrado";
      }
    }
    return "Usuario no encontrado";
  }
  return "Ha ocurrido un error inesperado";
};

// error message to follow
export const getFollowErrorMessage = (error, method) => {
  if (method === "get") {
    if (error.data?.detail) {
      return "Error al cargar los seguidores";
    } else if (error.data?.error) {
      return "Usuario no encontrado";
    }
  } else if (method === "post") {
    if (error.data?.detail) {
      return "Error al intentar interactuar";
    } else if (error.data?.error) {
      return "Usuario no encontrado";
    }
  }
  return "Ha ocurrido un error inesperado";
};
