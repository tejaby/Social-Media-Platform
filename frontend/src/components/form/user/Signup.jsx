// libraries
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";

// services
import { createUser } from "../../../services/user";

// components
import FormGenerator from "../FormGenerator";

// hooks
import useSubmitForm from "../../../hooks/user/onSubmit";

const schema = yup
  .object({
    first_name: yup.string().min(5, "¿Cuál es tu nombre").required(),
    last_name: yup.string().min(5, "¿Cuál es tu apellido?").required(),
    email: yup
      .string()
      .email()
      .required("Introduce un correo electronico válido"),
    username: yup.string().required("Introduce un nombre válido"),
    password: yup.string().min(6, "Introduce una contraseña válida").required(),
  })
  .required();

const formData = [
  {
    type: "text",
    name: "first_name",
    label: "Nombre",
    class:
      "border-2 border-white rounded w-full py-2 px-3 shadow focus:outline-none focus:border-background",
    container: "1/2",
  },
  {
    type: "text",
    name: "last_name",
    label: "Apellido",
    class:
      "border-2 border-white rounded w-full py-2 px-3 shadow focus:outline-none focus:border-background",
    container: "1/2",
  },
  {
    type: "email",
    name: "email",
    label: "Correo electrónico",
    class:
      "border-2 border-white rounded w-full py-2 px-3 shadow focus:outline-none focus:border-background",
    container: "full",
  },
  {
    type: "text",
    name: "username",
    label: "Usuario",
    class:
      "border-2 border-white rounded w-full py-2 px-3 shadow focus:outline-none focus:border-background",
    container: "full",
  },
  {
    type: "password",
    name: "password",
    label: "Contraseña",
    class:
      "border-2 border-white rounded w-full py-2 px-3 shadow focus:outline-none focus:border-background",
    container: "full",
  },
];

const headers = {
  title: "Crea tu cuenta",
  message: "¿Ya tienes una cuenta?",
  button_submit: "Crear cuenta",
  button_form: "Iniciar sesión",
};

function Signup() {
  const { error, onSubmit } = useSubmitForm(createUser);

  const handleFormSubmit = (data) => {
    onSubmit(data, "create");
  };

  toast.error(`${error?.data.username}`);

  return (
    <>
      <FormGenerator
        formData={formData}
        schema={schema}
        headers={headers}
        onSubmit={onSubmit}
        handleFormSubmit={handleFormSubmit}
      />
      {error && <Toaster position="bottom-center" reverseOrder={false} />}
    </>
  );
}

export default Signup;
