// react
import { useContext } from "react";

function ImageUploader({
  handleChangeFile,
  cover,
  toggleNextPost,
  toggleBackPost,
}) {
  return (
    <>
      {!!cover ? (
        <>
          <div className="basis-full flex flex-col">
            <div className="flex justify-between p-1">
              <button
                className="rounded-lg font-semibold hover:text-primary"
                onClick={toggleBackPost}
              >
                atras
              </button>
              <button
                className="rounded-lg font-semibold hover:text-primary"
                onClick={toggleNextPost}
              >
                siguiente
              </button>
            </div>
            <div className="grow basis-full relative">
              <img
                src={cover}
                alt=""
                className="absolute inset-0 w-full h-full object-cover rounded-b-lg"
              />
            </div>
          </div>
        </>
      ) : (
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
                onChange={handleChangeFile}
                accept="image/*"
                className="text-sm text-slate-500 file:mr-2 file:p-4 file:rounded-full file:border-0 file:font-semibold file:bg-violet-100 file:text-black hover:file:bg-primary hover:file:text-white"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ImageUploader;
