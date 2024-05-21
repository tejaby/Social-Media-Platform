// services
import { createUserService } from "../../../services/user";

// components
import FormGenerator from "../FormGenerator";
import getSignupConfig from "./getSignupConfig";

// hooks
import { useUserRequest } from "../../../hooks/user/useUserRequest";

function Signup() {
  const { executeRequest } = useUserRequest(createUserService);

  const { schema, formData, headers } = getSignupConfig();

  const handleFormSubmit = (data) => {
    executeRequest("create", data);
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

export default Signup;
