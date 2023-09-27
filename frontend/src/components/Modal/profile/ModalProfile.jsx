// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";

// hooks
import UseSvgLoader from "../../../hooks/useSvgLoader";
import useToggleModalPost from "../../../hooks/interface/useToggleModalPost";

// react
import { useContext, useState } from "react";

function ModalProfile() {
  const { showModalProfile, setShowModalProfile } =
    useContext(InterfaceContext);
  const { user } = useContext(UserContext);

  const { toggleShowModal } = useToggleModalPost(
    setShowModalProfile,
    showModalProfile
  );

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <div
        className={`flex flex-col w-full h-full xs:max-w-xl xs:h-1/2 sm:h-3/4 xs:rounded-lg bg-white`}
      >
        <div className="flex border-b-2 p-2 ">
          <button className="font-semibold hover:text-primary">atras</button>
          <p className="grow text-base font-semibold">Editar perfil</p>
          <button className="font-semibold hover:text-primary">Guardar</button>
        </div>

        <form className="grow flex flex-col">
          <div className="basis-1/2 flex flex-col justify-center">
            <div className="py-2">
              <p className="text-base sm:text-lg">Actualizar foto de perfil</p>
            </div>
            <div
              className={`${
                show ? "relative grow " : ""
              }flex justify-center items-center`}
            >
              {!show ? (
                <input
                  type="file"
                  accept=".png, .jpg, .webp"
                  className="text-sm text-slate-500 file:mr-2 file:p-4 file:rounded-full file:border-0 file:font-semibold file:bg-violet-100 file:text-black hover:file:bg-primary hover:file:text-white"
                  onChange={handleShow}
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1695637453789-428d537b1ff0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
                  alt=""
                  className="absolute w-full h-full xs:w-32 xs:h-32 sm:w-44 sm:h-44 object-cover xs:rounded-full"
                />
              )}
            </div>
          </div>
          <div className="basis-1/2 flex flex-col justify-center">
            <div className="basis-1/2 flex flex-col justify-center">
              <label className="text-base font-semibold sm:text-lg">
                Biografía
              </label>
              <textarea
                className="text-base text-center font resize-none focus:outline-none"
                placeholder={`¡Date a conocer!`}
              />
            </div>
            <div className="basis-1/2 flex flex-col justify-center">
              <label className="text-base font-semibold sm:text-lg">
                Sitio Web
              </label>
              <input type="text" />
            </div>
          </div>
        </form>
      </div>

      {/* <div>
        <button
          onClick={() => {
            toggleShowModal();
          }}
        >
          <UseSvgLoader name="x" options={{ width: "32px", height: "32px" }} />
        </button>
      </div> */}
    </>
  );
}

export default ModalProfile;
