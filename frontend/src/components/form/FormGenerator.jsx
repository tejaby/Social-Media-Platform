// Libraries
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>{headers.title}</h2>
      {formData.map((input) => {
        return (
          <div key={input.name}>
            <label htmlFor={input.name}>{input.label}</label>
            <input {...register(input.name)} type={input.type} />
            <p>{errors[input.name]?.message}</p>
          </div>
        );
      })}
      <input type="submit" />
      <p>
        {headers.message}
        <button onClick={toggleForm}>Sign Up</button>
      </p>
    </form>
  );
}

export default FormGenerator;
