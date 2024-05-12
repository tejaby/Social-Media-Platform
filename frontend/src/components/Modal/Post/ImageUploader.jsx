// context
import { InterfaceContext } from "../../../context/Interface";
import { PostContext } from "../../../context/Post";

// hooks
import useFileReader from "../../../hooks/post/useFileReader";

// react
import { useContext } from "react";

function ImageUploader({ cover, setCover }) {
  const { setCondition } = useContext(InterfaceContext);

  const { register, errors } = useContext(PostContext);

  const { handleChangeFile } = useFileReader(setCover);

  return (
    <>
      <div className="border-b-2 border-colorHover dark:border-darkColorHover p-2">
        <p className="text-base font-semibold text-black dark:text-white">
          Crear nueva publicación
        </p>
      </div>
      <div className="grow flex flex-col justify-center items-center flex-wrap gap-4 w-full">
        <div className="w-full p-2">
          <p className="text-base sm:text-lg text-black dark:text-white">
            Seleccionar foto para publicar
          </p>
        </div>
        <div className="w-full p-2 flex flex-wrap justify-center items-center">
          <input
            type="file"
            id="file"
            {...register("image")}
            accept=".png, .jpg, .webp"
            className="text-sm file:mr-2 file:p-4 file:rounded-full file:border-0 file:font-semibold text-darkColorHover dark:text-colorHover file:text-white file:bg-PrimaryColor hover:file:bg-PrimaryColorHover"
            onChange={(e) => {
              handleChangeFile(e);
              setCondition(true);
            }}
          />
          <p>{errors.image?.message}</p>
        </div>
      </div>
    </>
  );
}

export default ImageUploader;
