// components
import ImageUploader from "./ImageUploader";
import ImagePreviewAndCaption from "./ImagePreviewAndCaption";

// context
import { InterfaceContext } from "../../../context/Interface";

// hooks
import UseSvgLoader from "../../../hooks/useSvgLoader";

// react
import { useContext } from "react";

function ModalPost() {
  const { toggleShowModal, setCondition, condition } =
    useContext(InterfaceContext);

  return (
    <>
      <div className="absolute flex justify-center items-center w-full h-full bg-black-rgba text-center">
        <div
          className={`flex flex-col h-2/5 ${
            !condition
              ? "w-4/5 xs:w-2/3 sm:w-3/5 md:w-1/2 lg:w-2/5"
              : "w-full h-full xs:w-4/5 sm:w-4/5 md:w-3/4 lg:w-4/5"
          } xs:h-2/5 sm:h-1/2 lg:h-3/5 rounded-lg bg-white`}
        >
          <div
            className={`basis-full ${condition ? "hidden" : "flex"} flex-col`}
          >
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
              if (confirm(text) == true) {
                setCondition(false);
                toggleShowModal();
              }
            }}
          >
            <UseSvgLoader
              name="x"
              options={{ width: "32px", height: "32px" }}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default ModalPost;
