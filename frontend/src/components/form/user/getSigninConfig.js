// libraries
import * as yup from "yup";

function getSigninConfig() {
  const schema = yup.object({
    username: yup
      .string()
      .required("¡Ingresa tu nombre de usuario!")
      .min(4, "El nombre de usuario debe tener al menos 4 caracteres"),
    password: yup
      .string()
      .required("¡La contraseña es obligatoria!")
      .min(6, "Introduce una contraseña de al menos 6 caracteres"),
  });

  return { schema };
}

export default getSigninConfig;
