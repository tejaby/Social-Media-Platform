// libraries
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
    content: yup.string().required("El campo de texto es obligatorio").max(100),
  });
  return { schema };
}

export default createPostConfig;
