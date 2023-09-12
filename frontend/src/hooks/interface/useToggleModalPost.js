// react
import { useState } from "react";

function useToggleModalPost() {
  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };
  return { toggleShowModal, showModal };
}

export default useToggleModalPost;
