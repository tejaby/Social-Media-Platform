// libraries
import * as yup from "yup";

// services
import { createUser } from "../../../services/user";

// components
import FormGenerator from "../FormGenerator";

// hooks
import useSubmitForm from "../../../hooks/user/onSubmit";

const schema = yup
  .object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string().min(6).required(),
  })
  .required();

const formData = [
  {
    type: "text",
    name: "first_name",
    label: "First Name",
  },
  {
    type: "text",
    name: "last_name",
    label: "Last Name",
  },
  {
    type: "email",
    name: "email",
    label: "Email",
  },
  {
    type: "text",
    name: "username",
    label: "Username",
  },
  {
    type: "password",
    name: "password",
    label: "Password",
  },
];

const headers = {
  title: "Sign Up",
  message: "¿Tienes una cuenta?",
};

function Signup() {
  const { error, onSubmit } = useSubmitForm(createUser);

  const handleFormSubmit = (data) => {
    onSubmit(data, "create");
  };

  return (
    <>
      <FormGenerator
        formData={formData}
        schema={schema}
        headers={headers}
        onSubmit={onSubmit}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
}

export default Signup;
