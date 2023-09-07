// libraries
import * as yup from "yup";

function getSignupConfig() {
  const schema = yup
    .object({
      first_name: yup.string().min(1, "¿Cuál es tu nombre").required(),
      last_name: yup.string().min(1, "¿Cuál es tu apellido?").required(),
      email: yup
        .string()
        .email()
        .required("Introduce un correo electronico válido"),
      username: yup.string().required("Introduce un nombre válido"),
      password: yup
        .string()
        .min(6, "Introduce una contraseña válida")
        .required(),
    })
    .required();

  const formData = [
    {
      type: "text",
      name: "first_name",
      label: "Nombre",
      class:
        "border-2 border-white rounded w-full py-2 px-3 shadow focus:outline-none focus:border-primary",
      width: "md:w-1/2",
    },
    {
      type: "text",
      name: "last_name",
      label: "Apellido",
      class:
        "border-2 border-white rounded w-full py-2 px-3 shadow focus:outline-none focus:border-primary",
      width: "md:w-1/2",
    },
    {
      type: "email",
      name: "email",
      label: "Correo electrónico",
      class:
        "border-2 border-white rounded w-full py-2 px-3 shadow focus:outline-none focus:border-primary",
      width: "md:w-full",
    },
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
    title: "Crea tu cuenta",
    message: "¿Ya tienes una cuenta?",
    button_submit: "Crear cuenta",
    button_form: "Iniciar sesión",
  };

  return { schema, formData, headers };
}

export default getSignupConfig;
