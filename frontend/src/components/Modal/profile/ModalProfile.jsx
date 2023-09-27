// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";

// hooks
import UseSvgLoader from "../../../hooks/useSvgLoader";
import useToggleModalPost from "../../../hooks/interface/useToggleModalPost";

// react
import { useContext } from "react";

function ModalProfile() {
  const { showModal, setShowModal } = useContext(InterfaceContext);
  const { user } = useContext(UserContext);

  const { toggleShowModal } = useToggleModalPost(setShowModal, showModal);

  return (
    <>
      <div
        className={`flex flex-col h-2/5 xs:h-2/5 sm:h-1/2 lg:h-3/5 xs:rounded-lg bg-white`}
      ></div>

      <button
        onClick={() => {
          toggleShowModal();
        }}
      >
        <UseSvgLoader name="x" options={{ width: "32px", height: "32px" }} />
      </button>
    </>
  );
}

export default ModalProfile;
