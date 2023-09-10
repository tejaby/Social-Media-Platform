// components
import ImageUploader from "./ImageUploader";
import ImagePreviewAndCaption from "./ImagePreviewAndCaption";

// context
import { InterfaceContext } from "../../../context/Interface";

// hooks
import UseSvgLoader from "../../../hooks/useSvgLoader";
import useFileReader from "../../../hooks/post/useFileReader";

// react
import { useContext } from "react";

function ModalPost() {
  const { isModalPost, setIsModalPost, isNextPost, setIsNextPost } =
    useContext(InterfaceContext);
  const { handleChangeFile, setCover, cover } = useFileReader();

  const toggleModalPost = () => {
    setIsModalPost(!isModalPost);
    setIsNextPost(false);
  };

  const toggleNextPost = () => {
    setIsNextPost(true);
  };

  const toggleBackPost = () => {
    setCover(null);
    setIsNextPost(false);
  };

  return (
    <>
      <div className="absolute flex justify-center items-center w-full h-full bg-black-rgba text-center">
        <div className="flex flex-col w-4/5 h-2/5 xs:w-2/3 sm:w-3/5 sm:h-2/4 md:w-1/2 lg:w-2/5 rounded-lg bg-white">
          {!!isNextPost ? (
            <ImagePreviewAndCaption
              cover={cover}
              toggleBackPost={toggleBackPost}
            />
          ) : (
            <ImageUploader
              cover={cover}
              handleChangeFile={handleChangeFile}
              toggleNextPost={toggleNextPost}
              toggleBackPost={toggleBackPost}
            />
          )}
        </div>
        <div className="absolute top-0 right-0 p-4">
          <button onClick={toggleModalPost}>
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
