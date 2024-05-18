// components
import ModalPost from "./post/ModalPost";
import ModalProfile from "./profile/ModalProfile";
import ViewPostModal from "./post/ViewPostModal";

// context
import { InterfaceContext } from "../../context/Interface";

// react
import { useContext } from "react";

function ShowModal() {
  const { showModalProfile, showModalPost, showViewPost } =
    useContext(InterfaceContext);

  return (
    <div className="absolute flex justify-center items-center w-full h-full text-center bg-lightOverlayColor dark:bg-darkOverlayColor z-50">
      {showModalProfile && <ModalProfile />}
      {showModalPost && <ModalPost />}
      {showViewPost && <ViewPostModal />}
    </div>
  );
}

export default ShowModal;
