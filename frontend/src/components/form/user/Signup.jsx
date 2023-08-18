import * as yup from "yup";

import FormGenerator from "../FormGenerator";

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

const title = "Sign Up";

function Signup() {
  return (
    <>
      <FormGenerator formData={formData} schema={schema} title={title} />
    </>
  );
}

export default Signup;
