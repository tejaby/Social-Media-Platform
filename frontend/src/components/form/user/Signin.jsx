import * as yup from "yup";

import FormGenerator from "../FormGenerator";

import { loginUser } from "../../../services/user";

import useSubmitForm from "../../../hooks/user/onSubmit";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().min(6).required(),
  })
  .required();

const formData = [
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
  title: "Sign In",
  message: "¿No tienes una cuenta?",
};

function Signin() {
  const { error, onSubmit } = useSubmitForm(loginUser);

  const handleFormSubmit = (data) => {
    onSubmit(data, "login");
  };

  return (
    <>
      <FormGenerator
        formData={formData}
        schema={schema}
        headers={headers}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
}

export default Signin;
