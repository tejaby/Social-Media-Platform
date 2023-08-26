// Libraries
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// hooks
import UseSvgLoader from "../../hooks/useSvgLoader";

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
      className="max-w-xs py-6 shadow sm:max-w-md"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col items-center mb-4">
        <div className="">
          <UseSvgLoader
            name="logo"
            options={{ width: "48px", height: "48px" }}
          />
        </div>
        <h2 className="font-bold">{headers.title}</h2>
      </div>
      <div className="flex flex-wrap mb-4 px-3 md:px-12">
        {formData.map((input) => {
          return (
            <div
              className={`mb-2 px-2 w-full lg:w-${input.container}`}
              key={input.name}
            >
              <label
                htmlFor={input.name}
                className="block font-semibold text-zinc-700"
              >
                {input.label}
              </label>
              <input
                {...register(input.name)}
                type={input.type}
                className={input.class}
              />
              <p className="text-xs text-red-600 sm:text-sm">
                {errors[input.name]?.message}
              </p>
            </div>
          );
        })}
      </div>
      <div className="w-full px-3 md:w-auto md:px-12 mb-4">
        <button
          type="submit"
          className="border rounded border-black w-full py-2 px-3 hover:border-transparent hover:text-white hover:bg-background"
        >
          {headers.button_submit}
        </button>
      </div>
      <div className="flex flex-col justify-center items-center sm:flex-row mb-4">
        <p className="font-extralight">{headers.message}</p>
        <button
          type="button"
          className="font-semibold text-background"
          onClick={toggleForm}
        >
          {headers.button_form}
        </button>
      </div>
    </form>
  );
}

export default FormGenerator;
