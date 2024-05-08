// libraries
import toast, { Toaster } from "react-hot-toast";

// services
import { loginService } from "../../../services/user";

// components
import FormGenerator from "../FormGenerator";
import getSigninConfig from "./getSigninConfig";

// hooks
import useFormSubmit from "../../../hooks/user/useFormSubmit";

function Signin() {
  const { error, onSubmit } = useFormSubmit(loginService);

  const { schema, formData, headers } = getSigninConfig();

  const handleFormSubmit = (data) => {
    onSubmit("login", null, data);
  };

  toast.error(`${error?.data.error}`);

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
