// services
import { logoutUser } from "../services/user";

// hooks
import useSubmitForm from "../hooks/user/onSubmit";
import useTokenLocalStorage from "../hooks/user/useTokenLocalStorage ";

function Account() {
  const { error, onSubmit } = useSubmitForm(logoutUser);

  const { getToken } = useTokenLocalStorage("userToken");

  const handleFormSubmit = () => {
    const token = getToken();
    onSubmit(token, "logout");
  };

  return (
    <div>
      Account - private
      <button onClick={handleFormSubmit}>logout</button>
    </div>
  );
}

export default Account;
