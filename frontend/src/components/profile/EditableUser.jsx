// libraries
import { useForm } from "react-hook-form";

// services
import { updateUserService } from "../../services/user";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";

// hooks
import UseSvgLoader from "../../hooks/useSvgLoader";
import { useUserRequest } from "../../hooks/user/useUserRequest";

// react
import { useContext } from "react";

function EditableUser({ setIsEditing, field }) {
  const { theme } = useContext(InterfaceContext);

  const { token } = useContext(UserContext);

  const { executeRequest } = useUserRequest(updateUserService);

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (token) {
      executeRequest("update", data, token.access, field.id);
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className={`w-full py-3 px-3 rounded border  ${
            errors[field.name]
              ? "border-colorError focus:border-colorError dark:border-colorError dark:focus:border-colorError"
              : "border-colorHover focus:border-PrimaryColor dark:border-darkColorHover dark:focus:border-PrimaryColor"
          } focus:outline-none text-black dark:text-white bg-white dark:bg-DarkColor`}
          spellCheck="false"
          defaultValue={field.value}
          {...register(field.name, {
            required: "Este campo es obligatorio",
            maxLength: {
              value: 50,
              message: "No debe superar los 50 caracteres",
            },
            minLength: {
              value: 4,
              message: "Debe tener al menos 4 caracteres",
            },
          })}
        />
        {errors[field.name] && (
          <p className="w-full text-colorError">{errors[field.name].message}</p>
        )}
        <button className="rounded-full px-4 py-2 font-semibold text-white bg-PrimaryColor hover:bg-PrimaryColorHover">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default EditableUser;
