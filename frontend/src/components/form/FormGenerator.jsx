// Libraries
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import UseSvgLoader from "../ui/UseSvgLoader";

// context
import { InterfaceContext } from "../../context/Interface";

// react
import { useContext } from "react";

function FormGenerator({ formData, schema, headers, handleFormSubmit }) {
  const { showLogin, setShowLogin } = useContext(InterfaceContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <form
      className="h-full w-full sm:max-w-lg sm:h-max flex flex-col justify-center px-8 sm:px-12 sm:m-4 rounded-lg sm:border border-colorHover dark:border-darkColorHover"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col items-center my-4">
        <UseSvgLoader name="logo" options={{ width: "48px", height: "48px" }} />
        <h2 className="font-semibold text-lg text-black dark:text-white">
          {headers.title}
        </h2>
      </div>
      <div className="mb-4">
        {formData.map((input) => {
          return (
            <div className="my-2" key={input.name}>
              <label
                htmlFor={input.name}
                className="font-semibold text-black dark:text-white"
              >
                {input.label}
              </label>
              <input
                {...register(input.name)}
                type={input.type}
                className="w-full mt-1 px-2 py-3 outline-none border-2 rounded-lg text-black dark:text-white border-colorHover dark:border-darkColorHover focus:border-PrimaryColor dark:focus:border-PrimaryColor bg-white dark:bg-DarkColor"
                spellCheck="false"
                autoComplete="off"
              />
              <p className="text-xs sm:text-sm text-colorError">
                {errors[input.name]?.message}
              </p>
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        className="w-full px-2 py-3 mb-4 font-semibold rounded-lg text-white bg-PrimaryColor hover:bg-PrimaryColorHover"
      >
        {headers.button_submit}
      </button>
      <div className="flex flex-col sm:flex-row gap-1 justify-center items-center my-4">
        <p className="font-extralight text-secondaryText dark:text-secondaryTextDark">
          {headers.message}
        </p>
        <span
          className="font-semibold text-PrimaryColor hover:text-PrimaryColorHover cursor-pointer"
          onClick={toggleForm}
        >
          {headers.button_form}
        </span>
      </div>
    </form>
  );
}

export default FormGenerator;
