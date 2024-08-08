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
const getLoginErrorMessage = (error) => {
  const { status, data } = error;

  switch (status) {
    case 400:
      if (data.error === "se requiere nombre de usuario y contraseña") {
        return "Se requiere nombre de usuario y contraseña";
      } else if (
        data.error ===
        "No se encontró ninguna cuenta activa con las credenciales proporcionadas"
      ) {
        return "Las credenciales proporcionadas son incorrectas.";
      } else if (data.error === "La contraseña es incorrecta") {
        return "La contraseña ingresada es incorrecta.";
      }
      return "Solicitud inválida.";
    case 403:
      if (
        data.error ===
        "La cuenta está desactivada. Por favor, contacta al administrador."
      ) {
        return "Su cuenta está desactivada. Active su cuenta o contacte al soporte.";
      }
      return "No tiene permiso para realizar esta acción.";
    default:
      if (status >= 500) {
        return "Ocurrió un problema en el servidor. Por favor, intenta nuevamente más tarde.";
      }
      return "Ha ocurrido un error inesperado";
  }
};

const getRefreshErrorMessage = (error) => {
  const { status, data } = error;

  switch (status) {
    case 401:
      if (data.detail === "Token is invalid or expired.") {
        return "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
      } else return "No autorizado. Por favor, verifica tus credenciales.";
    case 400:
      if (data.refresh === "This field is required") {
        return "Error al actualizar el token. Intente nuevamente.";
      }
      return "Solicitud inválida.";
    default:
      if (status >= 500) {
        return "Ocurrió un problema en el servidor. Por favor, intenta nuevamente más tarde.";
      }
      return "Ha ocurrido un error inesperado";
  }
};

const getLogoutErrorMessage = (error) => {
  const { status, data } = error;

  switch (status) {
    case 400:
      if (data.error === "se requiere el token de actualización") {
        return "No se pudo cerrar la sesión. Intente nuevamente.";
      } else if (data.error === "Token de refresco inválido") {
        return "No se pudo cerrar la sesión. Intente nuevamente.";
      }
      return "Solicitud inválida.";
    default:
      if (status >= 500) {
        return "Ocurrió un problema en el servidor. Por favor, intenta nuevamente más tarde.";
      }
      return "Ha ocurrido un error inesperado";
  }
};

export const getAuthErrorMessage = (error, method) => {
  if (error) {
    switch (method) {
      case "refresh":
        return getRefreshErrorMessage(error);
      case "login":
        return getLoginErrorMessage(error);
      case "logout":
        return getLogoutErrorMessage(error);
      default:
        return "Ha ocurrido un error inesperado";
    }
  } else {
    return "Error de conexión. Por favor, inténtalo de nuevo";
  }
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

// error message to update password
export const getUpdatePasswordErrorMessage = (error) => {
  if (!error) {
    return "Error de conexión. Por favor, inténtalo de nuevo";
  }

  const { status, data } = error;

  switch (status) {
    case 401:
      if (data.detail === "Authentication credentials were not provided.") {
        return "No se pudo verificar tu sesión. Por favor, inicia sesión nuevamente.";
      } else if (data.detail === "Given token not valid for any token type") {
        return "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
      } else return "No autorizado. Por favor, verifica tus credenciales.";
    case 400:
      if (data.old_password) {
        if (data.old_password[0] === "This field is required.") {
          return "La contraseña antigua es requerida";
        } else if (data.old_password[0] === "Contraseña actual incorrecta") {
          return "Contraseña actual incorrecta";
        }
      }
      if (data.new_password) {
        if (data.new_password[0] === "This field is required.") {
          return "La nueva contraseña es requerida";
        } else if (
          data.new_password[0] ===
          "La nueva contraseña no puede ser igual a la antigua."
        ) {
          return "La nueva contraseña no puede ser igual a la antigua";
        }
      }
      return "Solicitud inválida. Por favor, revisa los datos ingresados.";
    default:
      if (status >= 500) {
        return "Ocurrió un problema en el servidor. Por favor, intenta nuevamente más tarde.";
      }
      return "Ha ocurrido un error inesperado";
  }
};

// error message to deactivate account
export const getDeactivateErrorMessage = (error) => {
  if (error) {
    const { status, data } = error;

    switch (status) {
      case 401:
        if (data.detail === "Authentication credentials were not provided.") {
          return "No se pudo verificar tu sesión. Por favor, inicia sesión nuevamente.";
        } else if (data.detail === "Given token not valid for any token type") {
          return "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
        } else if (data.detail === "User is inactive") {
          return "El usuario ya está deshabilitado";
        } else return "No autorizado. Por favor, verifica tus credenciales.";
      case 400:
        if (data.error === "El usuario ya está deshabilitado") {
          return "El usuario ya está deshabilitado";
        } else {
          return "Solicitud inválida";
        }
      case 404:
        if (data.error === "Usuario no encontrado") {
          return "Usuario no encontrado";
        } else {
          return "Recurso no encontrado";
        }
      default:
        if (status >= 500) {
          return "Ocurrió un problema en el servidor. Por favor, intenta nuevamente más tarde.";
        }
        return "Ha ocurrido un error inesperado";
    }
  } else {
    return "Error de conexión. Por favor, inténtalo de nuevo";
  }
};

// error message to activate account
export const getActivateErrorMessage = (error) => {
  if (error) {
    const { status, data } = error;
    switch (status) {
      case 400:
        if (data.error === "El usuario ya está activo") {
          return "El usuario ya está activo";
        } else {
          return "Solicitud inválida";
        }
      case 404:
        if (data.error === "Usuario no encontrado") {
          return "Usuario no encontrado";
        } else {
          return "Recurso no encontrado";
        }
      default:
        if (status >= 500) {
          return "Ocurrió un problema en el servidor. Por favor, intenta nuevamente más tarde.";
        }
        return "Ha ocurrido un error inesperado";
    }
  } else {
    return "Error de conexión. Por favor, inténtalo de nuevo";
  }
};
