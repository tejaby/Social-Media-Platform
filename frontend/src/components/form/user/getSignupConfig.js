// libraries
import * as yup from "yup";

function getSignupConfig() {
  const schema = yup.object({
    first_name: yup
      .string()
      .required("¡No olvides tu nombre!")
      .matches(/^[A-Za-z]+$/, "El nombre solo puede contener letras")
      .min(2, "El nombre debe tener al menos 2 caracteres"),
    last_name: yup
      .string()
      .required("¡Tu apellido es importante!")
      .matches(/^[A-Za-z]+$/, "El apellido solo puede contener letras")
      .min(2, "El apellido debe tener al menos 2 caracteres"),
    email: yup
      .string()
      .required("¡Necesitamos tu correo electrónico!")
      .email("Introduce un correo electrónico válido"),
    username: yup
      .string()
      .required("¡Ingresa un nombre de usuario!")
      .min(4, "El nombre de usuario debe tener al menos 4 caracteres"),
    password: yup
      .string()
      .required("¡La contraseña es obligatoria!")
      .min(6, "Introduce una contraseña de al menos 6 caracteres"),
    password2: yup
      .string()
      .required("Por favor, confirme su contraseña")
      .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir"),
  });

  return { schema };
}

export default getSignupConfig;
