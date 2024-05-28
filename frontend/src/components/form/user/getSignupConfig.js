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
    },
    {
      type: "text",
      name: "last_name",
      label: "Apellido",
    },
    {
      type: "email",
      name: "email",
      label: "Correo electrónico",
    },
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
    title: "Crea tu cuenta",
    message: "¿Ya tienes una cuenta?",
    button_submit: "Crear cuenta",
    button_form: "Iniciar sesión",
  };

  return { schema, formData, headers };
}

export default getSignupConfig;
