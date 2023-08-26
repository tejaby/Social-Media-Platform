// libraries
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";

// services
import { loginUser } from "../../../services/user";

// components
import FormGenerator from "../FormGenerator";

// hooks
import useSubmitForm from "../../../hooks/user/onSubmit";

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
  title: "Iniciar sesión en su cuenta",
  message: "¿No tienes una cuenta?",
  button_submit: "Iniciar sesión",
  button_form: "Crear cuenta",
};

function Signin() {
  const { error, onSubmit } = useSubmitForm(loginUser);

  const handleFormSubmit = (data) => {
    onSubmit(data, "login");
  };

  console.log("hola");

  toast.error(`${error?.data.message}`);

  return (
    <>
      <FormGenerator
        formData={formData}
        schema={schema}
        headers={headers}
        handleFormSubmit={handleFormSubmit}
      />
      {error && <Toaster position="bottom-center" reverseOrder={false} />}
    </>
  );
}

export default Signin;
