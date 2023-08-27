// libraries
import toast, { Toaster } from "react-hot-toast";

// services
import { createUser } from "../../../services/user";

// components
import FormGenerator from "../FormGenerator";
import getSignupConfig from "./getSignupConfig";

// hooks
import useSubmitForm from "../../../hooks/user/onSubmit";

function Signup() {
  const { error, onSubmit } = useSubmitForm(createUser);

  const { schema, formData, headers } = getSignupConfig();

  const handleFormSubmit = (data) => {
    onSubmit(data, "create");
  };

  toast.error(`${error?.data.username}`);

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

export default Signup;
