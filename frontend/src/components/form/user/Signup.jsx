// Libraries
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// services
import { createUserService } from "../../../services/user";

// components
import getSignupConfig from "./getSignupConfig";
import UseSvgLoader from "./../../ui/UseSvgLoader";

// context
import { InterfaceContext } from "../../../context/Interface";

// hooks
import { useUserRequest } from "../../../hooks/user/useUserRequest";

// react
import { useContext } from "react";

function Signup() {
  const { showLogin, setShowLogin } = useContext(InterfaceContext);

  const { executeRequest } = useUserRequest(createUserService);

  const { schema } = getSignupConfig();

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
    executeRequest("create", data);
  };

  return (
    <form
      className="w-full max-w-lg px-8 pt-6 pb-8 rounded-lg sm:border border-colorHover dark:border-darkColorHover"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center mb-4">
        <UseSvgLoader name="logo" options={{ width: "48px", height: "48px" }} />
        <h2 className="font-semibold text-lg text-black dark:text-white">
          Crea tu cuenta
        </h2>
      </div>
      <div className="flex flex-col xs:flex-row xs:mb-4">
        <div className="w-full mr-2">
          <label
            htmlFor="name"
            className="font-semibold text-black dark:text-white"
          >
            Nombre
          </label>
          <input
            type="text"
            className="w-full mt-1 py-2 px-3 outline-none border-2 rounded-lg text-black dark:text-white border-colorHover dark:border-darkColorHover focus:border-PrimaryColor dark:focus:border-PrimaryColor bg-white dark:bg-DarkColor"
            id="name"
            spellCheck="false"
            autoComplete="off"
            {...register("first_name")}
          />
          <p className="text-xs sm:text-sm text-colorError">
            {errors.first_name?.message}
          </p>
        </div>
        <div className="w-full xs:ml-2">
          <label
            htmlFor="surname"
            className="font-semibold text-black dark:text-white"
          >
            Apellido
          </label>
          <input
            type="text"
            className="w-full mt-1 py-2 px-3 outline-none border-2 rounded-lg text-black dark:text-white border-colorHover dark:border-darkColorHover focus:border-PrimaryColor dark:focus:border-PrimaryColor bg-white dark:bg-DarkColor"
            id="surname"
            spellCheck="false"
            autoComplete="off"
            {...register("last_name")}
          />
          <p className="text-xs sm:text-sm text-colorError">
            {errors.last_name?.message}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="font-semibold text-black dark:text-white"
        >
          Correo electrónico
        </label>
        <input
          type="email"
          className="w-full mt-1 py-2 px-3 outline-none border-2 rounded-lg text-black dark:text-white border-colorHover dark:border-darkColorHover focus:border-PrimaryColor dark:focus:border-PrimaryColor bg-white dark:bg-DarkColor"
          id="email"
          spellCheck="false"
          autoComplete="off"
          {...register("email")}
        />
        <p className="text-xs sm:text-sm text-colorError">
          {errors.email?.message}
        </p>
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
          className="w-full mt-1 py-2 px-3 outline-none border-2 rounded-lg text-black dark:text-white border-colorHover dark:border-darkColorHover focus:border-PrimaryColor dark:focus:border-PrimaryColor bg-white dark:bg-DarkColor"
          id="username"
          spellCheck="false"
          autoComplete="off"
          {...register("username")}
        />
        <p className="text-xs sm:text-sm text-colorError">
          {errors.username?.message}
        </p>
      </div>
      <div className="flex flex-col xs:flex-row mb-4">
        <div className="w-full xs:mr-2">
          <label
            htmlFor="password"
            className="font-semibold text-black dark:text-white"
          >
            Contraseña
          </label>
          <input
            type="password"
            className="w-full mt-1 py-2 px-3 outline-none border-2 rounded-lg text-black dark:text-white border-colorHover dark:border-darkColorHover focus:border-PrimaryColor dark:focus:border-PrimaryColor bg-white dark:bg-DarkColor"
            id="password"
            autoComplete="new-password"
            {...register("password")}
          />
          <p className="text-xs sm:text-sm text-colorError">
            {errors.password?.message}
          </p>
        </div>
        <div className="w-full xs:ml-2">
          <label
            htmlFor="password2"
            className="font-semibold text-black dark:text-white"
          >
            Confirmar contraseña
          </label>
          <input
            type="password"
            className="w-full mt-1 py-2 px-3 outline-none border-2 rounded-lg text-black dark:text-white border-colorHover dark:border-darkColorHover focus:border-PrimaryColor dark:focus:border-PrimaryColor bg-white dark:bg-DarkColor"
            id="password2"
            autoComplete="new-password"
            {...register("password2")}
          />
          <p className="text-xs sm:text-sm text-colorError">
            {errors.password2?.message}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="w-full px-2 py-3 font-semibold rounded-lg text-white bg-PrimaryColor hover:bg-PrimaryColorHover"
        >
          Crear cuenta
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-1 justify-center items-center">
        <p className="font-extralight text-secondaryText dark:text-secondaryTextDark">
          ¿Ya tienes una cuenta?
        </p>
        <span
          className="font-semibold text-PrimaryColor hover:text-PrimaryColorHover cursor-pointer"
          onClick={toggleForm}
        >
          Iniciar sesión
        </span>
      </div>
    </form>
  );
}

export default Signup;
