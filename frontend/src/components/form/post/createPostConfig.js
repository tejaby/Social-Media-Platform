// libraries
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function createPostConfig() {
  const schema = yup.object({
    image: yup
      .mixed()
      .required("El archivo es obligatorio")
      .test("fileType", "Formato de archivo no válido", (value) => {
        if (!value.length) return false;
        return (
          value[0].type === "image/png" ||
          value[0].type === "image/jpeg" ||
          value[0].type === "image/webp"
        );
      }),
    content: yup
      .string()
      .required("El comentario es obligatorio")
      .max(200, "El comentario no puede tener más de 200 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return { register, errors, reset, handleSubmit };
}

export default createPostConfig;
