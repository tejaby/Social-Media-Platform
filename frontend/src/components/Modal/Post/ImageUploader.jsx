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
      <div className="border-b-2 p-2">
        <p className="text-base font-semibold">Crear nueva publicación</p>
      </div>
      <div className="grow flex flex-col justify-center items-center flex-wrap gap-4 w-full">
        <div className="w-full p-2">
          <p className="text-base sm:text-lg">Arrastra las fotos aquí</p>
        </div>
        <div className="w-full p-2 flex flex-wrap justify-center items-center">
          <input
            type="file"
            id="file"
            {...register("image")}
            accept=".png, .jpg, .webp"
            className="text-sm text-slate-500 file:mr-2 file:p-4 file:rounded-full file:border-0 file:font-semibold file:bg-violet-100 file:text-black hover:file:bg-primary hover:file:text-white"
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
