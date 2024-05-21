// services
import { loginService } from "../../../services/auth";

// components
import FormGenerator from "../FormGenerator";
import getSigninConfig from "./getSigninConfig";

// hooks
import { useAuthRequest } from "../../../hooks/user/useAuthRequest";

function Signin() {
  const { executeRequest } = useAuthRequest(loginService);

  const { schema, formData, headers } = getSigninConfig();

  const handleFormSubmit = (data) => {
    executeRequest("login", data);
  };

  return (
    <FormGenerator
      schema={schema}
      formData={formData}
      headers={headers}
      handleFormSubmit={handleFormSubmit}
    />
  );
}

export default Signin;
