// components
import ModalPost from "./post/ModalPost";
import ModalProfile from "./profile/ModalProfile";

// context
import { InterfaceContext } from "../../context/Interface";

// react
import { useContext } from "react";

function ShowModal() {
  const { showModalProfile, showModalPost } = useContext(InterfaceContext);

  return (
    <div className="absolute flex justify-center items-center w-full h-full bg-black-rgba text-center z-50">
      {showModalProfile && <ModalProfile />}
      {showModalPost && <ModalPost />}
    </div>
  );
}

export default ShowModal;
