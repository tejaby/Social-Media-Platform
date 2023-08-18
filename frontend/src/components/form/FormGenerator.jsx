import { useContext } from "react";

import { UserContext } from "../../context/User";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function FormGenerator({ formData, schema, title }) {
  const { login } = useContext(UserContext);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{title}</h2>
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
    </form>
  );
}

export default FormGenerator;
