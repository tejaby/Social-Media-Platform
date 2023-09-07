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
      class:
        "border-2 border-white rounded w-full py-2 px-3 shadow focus:outline-none focus:border-primary",
      width: "md:w-full",
    },
    {
      type: "password",
      name: "password",
      label: "Contraseña",
      class:
        "border-2 border-white rounded w-full py-2 px-3 shadow focus:outline-none focus:border-primary",
      width: "md:w-full",
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
