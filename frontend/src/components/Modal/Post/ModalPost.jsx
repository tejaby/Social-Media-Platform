// components
import ImageUploader from "./ImageUploader";
import ImagePreviewAndCaption from "./ImagePreviewAndCaption";

// context
import { InterfaceContext } from "../../../context/Interface";
import { PostContext } from "../../../context/Post";

// hooks
import UseSvgLoader from "../../../hooks/useSvgLoader";
import useModal from "../../../hooks/interface/useModal";

// react
import { useContext, useState } from "react";

function ModalPost() {
  const { theme, showModalPost, setShowModalPost, setCondition, condition } =
    useContext(InterfaceContext);

  const { reset } = useContext(PostContext);

  const { toggleModal } = useModal(setShowModalPost, showModalPost);

  // Estado para guardar la imagen de previsualización del post al publicar una imagen
  const [cover, setCover] = useState(null);

  return (
    <>
      <div className="flex flex-col w-full h-full xs:max-w-xl xs:h-5/6 xs:rounded-lg bg-white dark:bg-DarkColor">
        <ImageUploader setCover={setCover} condition={condition} />
        {condition && <ImagePreviewAndCaption cover={cover} />}
      </div>
      <div className="hidden xs:block absolute top-0 right-0 p-4">
        <button
          onClick={() => {
            reset();
            setCondition(false);
            toggleModal();
          }}
        >
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
