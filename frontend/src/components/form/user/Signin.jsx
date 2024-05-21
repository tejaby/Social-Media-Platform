// libraries
import toast, { Toaster } from "react-hot-toast";

// services

import { loginService } from "../../../services/auth";

// components
import FormGenerator from "../FormGenerator";
import getSigninConfig from "./getSigninConfig";

// hooks

import { useAuthRequest } from "../../../hooks/user/useAuthRequest";

function Signin() {
  const { executeRequest, error } = useAuthRequest(loginService);

  const { schema, formData, headers } = getSigninConfig();

  const handleFormSubmit = (data) => {
    executeRequest("login", data);
  };

  // toast.error(`${error?.data.error}`);

  return (
    <>
      <FormGenerator
        schema={schema}
        formData={formData}
        headers={headers}
        handleFormSubmit={handleFormSubmit}
      />
      {/* {error && <Toaster position="bottom-center" reverseOrder={false} />} */}
    </>
  );
}

export default Signin;
