// librerias

import * as yup from "yup";

import FormGenerator from "../FormGenerator";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
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

const title = "Sign In";

function Signin() {
  return (
    <>
      <FormGenerator formData={formData} schema={schema} title={title} />
    </>
  );
}

export default Signin;
