// context
import { InterfaceContext } from "../../context/Interface";

// react
import { useContext } from "react";

function useModal(setterState, state) {
  const { showModal, setShowModal } = useContext(InterfaceContext);

  const toggleModal = () => {
    setShowModal(!showModal);
    setterState(!state);
  };
  return { toggleModal };
}

export default useModal;
