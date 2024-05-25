// context
import { InterfaceContext } from "../../context/Interface";

// react
import { useContext } from "react";

function useModal() {
  const { showModal, setShowModal } = useContext(InterfaceContext);

  const toggleModal = (setterState, state) => {
    setterState(!state);
    setShowModal(!showModal);
  };
  return { toggleModal };
}

export default useModal;
