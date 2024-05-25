// context
import { InterfaceContext } from "../../../context/Interface";
import { PostContext } from "../../../context/Post";

// hooks
import useFileReader from "../../../hooks/post/useFileReader";
import UseSvgLoader from "../../../hooks/useSvgLoader";
import useModal from "../../../hooks/interface/useModal";

// react
import { useContext } from "react";

function ImageUploader({ setCover, condition }) {
  const { theme, setCondition, showModalPost, setShowModalPost } =
    useContext(InterfaceContext);

  const { register, errors } = useContext(PostContext);

  const { handleChangeFile } = useFileReader(setCover);

  const { toggleModal } = useModal(
    setShowModalPost,
    showModalPost
  );

  return (
    <div className={`basis-full ${!condition ? "flex flex-col" : "hidden"}`}>
      <div className="flex justify-between items-center border-b-2 border-colorHover dark:border-darkColorHover p-2">
        <button
          onClick={() => {
            toggleModal();
          }}
        >
          {theme === "light" ? (
            <UseSvgLoader
              name="arrow-left"
              options={{ width: "32px", height: "32px" }}
            />
          ) : (
            <UseSvgLoader
              name="arrow-leftDark"
              options={{ width: "32px", height: "32px" }}
            />
          )}
        </button>
        <span className="text-base font-semibold text-black dark:text-white">
          Crear nueva publicación
        </span>
        <span />
      </div>
      <div className="grow flex flex-col justify-center items-center flex-wrap gap-4 w-full">
        <div className="w-full p-2">
          <span className="text-base sm:text-lg text-black dark:text-white">
            Seleccionar foto para publicar
          </span>
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
    </div>
  );
}

export default ImageUploader;
