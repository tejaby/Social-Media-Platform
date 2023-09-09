// context
import { InterfaceContext } from "../../../context/Interface";

// hooks
import UseSvgLoader from "../../../hooks/useSvgLoader";

// react
import { useContext } from "react";

function ModalPost() {
  const { isModalPost, setIsModalPost } = useContext(InterfaceContext);

  const toggleModalPost = () => {
    setIsModalPost(!isModalPost);
  };

  return (
    <>
      {isModalPost && (
        <div className="absolute flex justify-center items-center w-full h-full bg-black-rgba text-center">
          <div className="flex flex-col w-3/4 h-2/4 rounded-lg bg-white sm:hidden">
            <div className="border-b-2">Crear nueva publicación</div>
            <div className="grow flex flex-col justify-center items-center gap-4">
              <div>Arrastra las fotos y los vídeos aquí</div>
              <input type="file" />
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4">
            <button onClick={toggleModalPost}>
              <UseSvgLoader
                name="x"
                options={{ width: "32px", height: "32px" }}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalPost;
