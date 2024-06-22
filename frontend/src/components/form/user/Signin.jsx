// Libraries
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// services
import { loginService } from "../../../services/auth";

// components
import getSigninConfig from "./getSigninConfig";
import UseSvgLoader from "./../../ui/UseSvgLoader";

// context
import { InterfaceContext } from "../../../context/Interface";

// hooks
import { useAuthRequest } from "../../../hooks/user/useAuthRequest";

// react
import { useContext } from "react";

function Signin() {
  const { showLogin, setShowLogin } = useContext(InterfaceContext);

  const { executeRequest } = useAuthRequest(loginService);

  const { schema } = getSigninConfig();

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    executeRequest("login", data);
  };

  return (
    <form
      className="w-full max-w-lg px-8 pt-6 pb-8 rounded-lg sm:border border-colorHover dark:border-darkColorHover"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center mb-4">
        <UseSvgLoader name="logo" options={{ width: "48px", height: "48px" }} />
        <h2 className="font-semibold text-lg text-black dark:text-white">
          Iniciar sesión en su cuenta
        </h2>
      </div>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="font-semibold text-black dark:text-white"
        >
          Usuario
        </label>
        <input
          type="text"
          id="username"
          className="w-full mt-1 py-2 px-3 outline-none border-2 rounded-lg text-black dark:text-white border-colorHover dark:border-darkColorHover focus:border-PrimaryColor dark:focus:border-PrimaryColor bg-white dark:bg-DarkColor"
          {...register("username")}
        />
        <p className="text-xs sm:text-sm text-colorError">
          {errors.username?.message}
        </p>
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="font-semibold text-black dark:text-white"
        >
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className="w-full mt-1 py-2 px-3 outline-none border-2 rounded-lg text-black dark:text-white border-colorHover dark:border-darkColorHover focus:border-PrimaryColor dark:focus:border-PrimaryColor bg-white dark:bg-DarkColor"
          {...register("password")}
        />
        <p className="text-xs sm:text-sm text-colorError">
          {errors.password?.message}
        </p>
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="w-full px-2 py-3 font-semibold rounded-lg text-white bg-PrimaryColor hover:bg-PrimaryColorHover"
        >
          Iniciar sesión
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-1 justify-center items-center">
        <p className="font-extralight text-secondaryText dark:text-secondaryTextDark">
          ¿No tienes una cuenta?
        </p>
        <span
          className="font-semibold text-PrimaryColor hover:text-PrimaryColorHover cursor-pointer"
          onClick={toggleForm}
        >
          Crear cuenta
        </span>
      </div>
    </form>
  );
}

export default Signin;
