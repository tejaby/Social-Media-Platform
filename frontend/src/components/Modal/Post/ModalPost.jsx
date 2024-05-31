// components
import ImageUploader from "./ImageUploader";
import ImagePreviewAndCaption from "./ImagePreviewAndCaption";

// context
import { InterfaceContext } from "../../../context/Interface";
import { PostContext } from "../../../context/Post";

// hooks
import UseSvgLoader from "../../../hooks/useSvgLoader";
import useModal from "../../../hooks/interface/useModal";
import useClickOutside from "../../../hooks/interface/useClickOutside";

// react
import { useContext, useState, useRef } from "react";

function ModalPost() {
  const { theme, showModalPost, setShowModalPost, setCondition, condition } =
    useContext(InterfaceContext);

  const { reset } = useContext(PostContext);

  const modalRef = useRef(null);

  const { toggleModal } = useModal();

  // Estado para guardar la imagen de previsualización del post al publicar una imagen
  const [cover, setCover] = useState(null);

  const closeModal = () => {
    reset();
    setCondition(false);
    toggleModal(setShowModalPost, showModalPost);
  };

  useClickOutside(modalRef, () => {
    closeModal();
  });

  return (
    <>
      <div
        ref={modalRef}
        className="flex flex-col w-full h-full xs:max-w-xl xs:h-5/6 xs:rounded-lg bg-white dark:bg-DarkColor"
      >
        <ImageUploader setCover={setCover} condition={condition} />
        {condition && <ImagePreviewAndCaption cover={cover} />}
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

export default ModalPost;
