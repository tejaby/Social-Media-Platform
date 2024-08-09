// libraries
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// services
import { changePasswordService } from "../../services/user";

// components
import UseSvgLoader from "../ui/UseSvgLoader";

// context
import { InterfaceContext } from "../../context/Interface";
import { UserContext } from "../../context/User";

// utils
import { getUpdatePasswordErrorMessage } from "../../utils/getErrorMessage";

// react
import { useContext } from "react";

function UpdatePassword({ setIsEditing, setIsChangingPassword }) {
  const { theme } = useContext(InterfaceContext);
  const { token } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("new_password", "");

  const handleCancelEditing = () => {
    setIsEditing(false);
    setIsChangingPassword(false);
  };

  const onSubmit = async (data) => {
    if (token) {
      try {
        const response = await changePasswordService(data, token.access);
        toast.success(response.message, { duration: 5000 });
        setIsEditing(false);
        setIsChangingPassword(false);
      } catch (err) {
        const errorMessage = getUpdatePasswordErrorMessage(err);
        toast.error(errorMessage, { duration: 5000 });
      }
    }
  };

  return (
    <>
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
          Cambia tu contraseña
        </p>
      </div>
      <form
        className="flex flex-col items-end gap-4 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full mb-4">
          <label
            htmlFor="old_password"
            className="text-sm sm:text-base text-black dark:text-white"
          >
            Contraseña actual
          </label>
          <input
            type="password"
            className={`w-full mt-2 py-3 px-3 rounded border  ${
              errors.old_password
                ? "border-colorError focus:border-colorError dark:border-colorError dark:focus:border-colorError"
                : "border-colorHover focus:border-PrimaryColor dark:border-darkColorHover dark:focus:border-PrimaryColor"
            } focus:outline-none text-black dark:text-white bg-white dark:bg-DarkColor`}
            id="old_password"
            autoComplete="current-password"
            {...register("old_password", {
              required: "¡La contraseña es obligatoria!",
              minLength: {
                value: 6,
                message: "Introduce una contraseña de al menos 6 caracteres",
              },
            })}
          />
          {errors.old_password && (
            <p className="w-full text-colorError">
              {errors.old_password.message}
            </p>
          )}
        </div>
        <div className="w-full mb-4">
          <label
            htmlFor="new_password"
            className="text-sm sm:text-base text-black dark:text-white"
          >
            Nueva contraseña
          </label>
          <input
            type="password"
            className={`w-full mt-2 py-3 px-3 rounded border  ${
              errors.new_password
                ? "border-colorError focus:border-colorError dark:border-colorError dark:focus:border-colorError"
                : "border-colorHover focus:border-PrimaryColor dark:border-darkColorHover dark:focus:border-PrimaryColor"
            } focus:outline-none text-black dark:text-white bg-white dark:bg-DarkColor`}
            id="new_password"
            autoComplete="new-password"
            {...register("new_password", {
              required: "¡La contraseña es obligatoria!",
              minLength: {
                value: 6,
                message: "Introduce una contraseña de al menos 6 caracteres",
              },
            })}
          />
          {errors.new_password && (
            <p className="w-full text-colorError">
              {errors.new_password.message}
            </p>
          )}
          <label
            htmlFor="confirm_Password"
            className="text-sm sm:text-base text-black dark:text-white"
          >
            Confirmar contraseña
          </label>
          <input
            type="password"
            className={`w-full mt-2 py-3 px-3 rounded border  ${
              errors.confirm_Password
                ? "border-colorError focus:border-colorError dark:border-colorError dark:focus:border-colorError"
                : "border-colorHover focus:border-PrimaryColor dark:border-darkColorHover dark:focus:border-PrimaryColor"
            } focus:outline-none text-black dark:text-white bg-white dark:bg-DarkColor`}
            id="confirm_Password"
            autoComplete="new-password"
            {...register("confirm_Password", {
              required: "Por favor, confirme su contraseña",
              minLength: {
                value: 6,
                message: "Introduce una contraseña de al menos 6 caracteres",
              },
              validate: (value) =>
                value === password || "Las contraseñas deben coincidir",
            })}
          />
          {errors.confirm_Password && (
            <p className="w-full text-colorError">
              {errors.confirm_Password.message}
            </p>
          )}
        </div>

        <button className="rounded-full px-4 py-2 font-semibold text-white bg-PrimaryColor hover:bg-PrimaryColorHover">
          Guardar
        </button>
      </form>
    </>
  );
}

export default UpdatePassword;
