// context
import { InterfaceContext } from "../../context/Interface";

// react
import { useContext } from "react";

function useToggleModalPost(contextSetter, state) {
  const { showModal, setShowModal } = useContext(InterfaceContext);

  const toggleShowModal = () => {
    setShowModal(!showModal);
    contextSetter(!state);
  };
  return { toggleShowModal };
}

export default useToggleModalPost;
