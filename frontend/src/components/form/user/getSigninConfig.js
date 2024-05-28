// libraries
import * as yup from "yup";

function getSigninConfig() {
  const schema = yup
    .object({
      username: yup.string().required("Introduce un usuario válido"),
      password: yup
        .string()
        .min(6, "Introduce una contraseña válida")
        .required(""),
    })
    .required();

  const formData = [
    {
      type: "text",
      name: "username",
      label: "Usuario",
    },
    {
      type: "password",
      name: "password",
      label: "Contraseña",
    },
  ];

  const headers = {
    title: "Iniciar sesión en su cuenta",
    message: "¿No tienes una cuenta?",
    button_submit: "Iniciar sesión",
    button_form: "Crear cuenta",
  };

  return { schema, formData, headers };
}

export default getSigninConfig;
