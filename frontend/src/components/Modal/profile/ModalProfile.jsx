// components
import UseSvgLoader from "../../ui/UseSvgLoader";
import UpdateProfileImage from "./UpdateProfileImage";
import UpdateProfileInfo from "./UpdateProfileInfo";

// context
import { InterfaceContext } from "../../../context/Interface";

// hooks
import useModal from "../../../hooks/interface/useModal";
import useClickOutside from "../../../hooks/interface/useClickOutside";

// react
import { useContext, useRef } from "react";

function ModalProfile() {
  const { theme, showModalProfile, setShowModalProfile } =
    useContext(InterfaceContext);

  const modalRef = useRef(null);

  const { toggleModal } = useModal();

  const closeModal = () => {
    toggleModal(setShowModalProfile, showModalProfile);
  };

  useClickOutside(modalRef, () => {
    closeModal();
  });

  return (
    <>
      <div
        ref={modalRef}
        className={`flex flex-col w-full h-full xs:max-w-xl xs:h-5/6 xs:rounded-lg bg-white dark:bg-DarkColor`}
      >
        <div className="flex items-center p-2 border-b-2 border-colorHover dark:border-darkColorHover">
          <button onClick={closeModal}>
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
          <h2 className="grow text-lg font-semibold text-black dark:text-white">
            Editar perfil
          </h2>
        </div>
        <div className="grow flex flex-col">
          <div className="basis-2/5">
            <UpdateProfileImage />
          </div>
          <div className="basis-3/5">
            <UpdateProfileInfo />
          </div>
        </div>
      </div>

      <div className="hidden xs:block absolute top-0 right-0 p-4">
        <button onClick={closeModal}>
          {theme === "light" ? (
            <UseSvgLoader
              name="x"
              options={{ width: "32px", height: "32px" }}
            />
          ) : (
            <UseSvgLoader
              name="xDark"
              options={{ width: "32px", height: "32px" }}
            />
          )}
        </button>
      </div>
    </>
  );
}

export default ModalProfile;
