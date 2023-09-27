// components
import ImageUploader from "./ImageUploader";
import ImagePreviewAndCaption from "./ImagePreviewAndCaption";

// context
import { InterfaceContext } from "../../../context/Interface";
import { PostContext } from "../../../context/Post";

// hooks
import UseSvgLoader from "../../../hooks/useSvgLoader";
import useToggleModalPost from "../../../hooks/interface/useToggleModalPost";

// react
import { useContext } from "react";

function ModalPost() {
  const { showModal, setShowModal, setCondition, condition } =
    useContext(InterfaceContext);

  const { reset } = useContext(PostContext);

  const { toggleShowModal } = useToggleModalPost(setShowModal, showModal);

  return (
    <>
      <div
        className={`flex flex-col h-2/5 ${
          !condition
            ? "w-4/5 xs:w-2/3 sm:w-3/5 md:w-1/2 lg:w-2/5 rounded-lg"
            : "w-full h-full xs:w-11/12 sm:w-4/5 md:w-3/4 lg:w-4/5"
        } xs:h-2/5 sm:h-1/2 lg:h-3/5 xs:rounded-lg bg-white`}
      >
        <div className={`basis-full ${condition ? "hidden" : "flex"} flex-col`}>
          <ImageUploader />
        </div>
        {condition && <ImagePreviewAndCaption />}
      </div>
      <div
        className={`${
          condition ? "hidden" : "block"
        } xs:block absolute top-0 right-0 p-4`}
      >
        <button
          onClick={() => {
            const text = "¿Descartar post?";
            if (condition) {
              if (confirm(text)) {
                setCondition(false);
                toggleShowModal();
                reset();
              }
            } else if (!condition) {
              setCondition(false);
              toggleShowModal();
              reset();
            }
          }}
        >
          <UseSvgLoader name="x" options={{ width: "32px", height: "32px" }} />
        </button>
      </div>
    </>
  );
}

export default ModalPost;
