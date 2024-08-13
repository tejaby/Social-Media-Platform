// components
import ModalPost from "./post_temp/ModalPost";
import ModalProfile from "./profile/ModalProfile";
import ViewPostModal from "./post_temp/ViewPostModal";

// context
import { InterfaceContext } from "../../context/Interface";

// react
import { useContext, useEffect } from "react";

function OverlayModal() {
  const { showModalProfile, showModalPost, showViewPost, showModal } =
    useContext(InterfaceContext);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center text-center bg-lightOverlayColor dark:bg-darkOverlayColor z-50">
      {showModalProfile && <ModalProfile />}
      {showModalPost && <ModalPost />}
      {showViewPost && <ViewPostModal />}
    </div>
  );
}

export default OverlayModal;
