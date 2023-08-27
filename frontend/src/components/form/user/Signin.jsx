// libraries
import toast, { Toaster } from "react-hot-toast";

// services
import { loginUser } from "../../../services/user";

// components
import FormGenerator from "../FormGenerator";
import getSigninConfig from "./getSigninConfig";

// hooks
import useSubmitForm from "../../../hooks/user/onSubmit";

function Signin() {
  const { error, onSubmit } = useSubmitForm(loginUser);

  const { schema, formData, headers } = getSigninConfig();

  const handleFormSubmit = (data) => {
    onSubmit(data, "login");
  };

  toast.error(`${error?.data.message}`);

  return (
    <>
      <FormGenerator
        schema={schema}
        formData={formData}
        headers={headers}
        handleFormSubmit={handleFormSubmit}
      />
      {error && <Toaster position="bottom-center" reverseOrder={false} />}
    </>
  );
}

export default Signin;
