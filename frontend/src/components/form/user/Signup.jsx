// libraries
import toast, { Toaster } from "react-hot-toast";

// services
import { createUserService } from "../../../services/user";

// components
import FormGenerator from "../FormGenerator";
import getSignupConfig from "./getSignupConfig";

// hooks
import { useUserRequest } from "../../../hooks/user/useUserRequest";

function Signup() {
  const { executeRequest, error } = useUserRequest(createUserService);

  const { schema, formData, headers } = getSignupConfig();

  const handleFormSubmit = (data) => {
    executeRequest("create", data);
  };

  // toast.error(`${error?.data.username}`);

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

export default Signup;
