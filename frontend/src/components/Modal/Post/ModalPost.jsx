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
      <div className="absolute flex justify-center items-center w-full h-full bg-black-rgba text-center">
        <div className="flex flex-col w-4/5 h-2/5 xs:w-2/3 sm:w-3/5 sm:h-2/4 md:w-1/2 lg:w-2/5 rounded-lg bg-white">
          <div className="border-b-2 p-2">
            <p className="text-base font-semibold">Crear nueva publicación</p>
          </div>
          <div className="grow flex flex-col justify-center items-center flex-wrap gap-4 w-full">
            <div className="w-full p-2">
              <p className="text-base sm:text-lg">
                Arrastra las fotos y los vídeos aquí
              </p>
            </div>
            <div className="w-full p-2 flex flex-wrap justify-center items-center">
              <input
                type="file"
                className="text-sm text-slate-500 file:mr-2 file:p-4 file:rounded-full file:border-0 file:font-semibold file:bg-violet-100 file:text-black hover:file:bg-primary hover:file:text-white"
              />
            </div>
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
    </>
  );
}

export default ModalPost;
