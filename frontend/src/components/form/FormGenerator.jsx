import { useContext } from "react";

import { UserContext } from "../../context/User";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InterfaceContext } from "../../context/Interface";

function FormGenerator({ formData, schema, headers }) {
  const { login } = useContext(UserContext);
  const { showLogin, setShowLogin } = useContext(InterfaceContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    login(data);
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
