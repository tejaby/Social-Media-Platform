// services
import { updateUserService } from "../../services/user";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";

// hooks
import UseSvgLoader from "../../hooks/useSvgLoader";
import { useUserRequest } from "../../hooks/user/useUserRequest";

// react
import { useContext, useState } from "react";

function EditableUser({ setIsEditing, field }) {
  const { theme } = useContext(InterfaceContext);

  const { token } = useContext(UserContext);

  const { executeRequest } = useUserRequest(updateUserService);

  const [inputValue, setInputValue] = useState(field.value);

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  const handleInputChange = (value) => {
    setInputValue(value.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      const updatedField = {
        [field.name]: inputValue,
      };
      executeRequest("update", updatedField, token.access, field.id);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2 items-center p-4 border-b-2 border-colorHover dark:border-darkColorHover">
        <button onClick={handleCancelEditing}>
          {theme === "light" ? (
            <UseSvgLoader
              name="arrow-left"
              options={{ width: "32px", height: "32px" }}
            />
          ) : (
            <UseSvgLoader
              name="arrow-leftDark"
              options={{ width: "32px", height: "32px" }}
            />
          )}
        </button>
        <p className="text-lg font-bold text-black dark:text-white">
          {field.label}
        </p>
      </div>
      <form
        className="flex flex-col items-end gap-4 p-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="w-full py-3 px-3 rounded border border-colorHover focus:border-PrimaryColor dark:border-darkColorHover dark:focus:border-PrimaryColor focus:outline-none text-black dark:text-white bg-white dark:bg-DarkColor"
          spellCheck="false"
          onChange={handleInputChange}
          value={inputValue}
        />

        <button className="rounded-full px-4 py-2 font-semibold text-white bg-PrimaryColor hover:bg-PrimaryColorHover">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default EditableUser;
