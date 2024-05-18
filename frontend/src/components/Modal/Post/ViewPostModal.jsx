// context
import { InterfaceContext } from "../../../context/Interface";

// hooks
import UseSvgLoader from "../../../hooks/useSvgLoader";
import useToggleModalPost from "../../../hooks/interface/useToggleModalPost";

// react
import { useContext } from "react";

function ViewPostModal() {
  const { theme, showViewPost, setShowViewPost } = useContext(InterfaceContext);

  const { toggleShowModal } = useToggleModalPost(setShowViewPost, showViewPost);

  return (
    <>
      <div className="lg:hidden w-full h-full xs:max-w-xl xs:h-full bg-white dark:bg-DarkColor"></div>

      <div className="hidden lg:flex lg:justify-between w-full h-full">
        <div className="xl:block"></div>
        <div className="basis-2/4 xl:basis-2/5 h-full bg-white dark:bg-DarkColor"></div>
        <div className="basis-30 xl:basis-1/5 h-full bg-white dark:bg-DarkColor"></div>
      </div>

      <div className="hidden sm:block absolute top-0 left-0 p-4">
        <button
          onClick={() => {
            toggleShowModal();
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

export default ViewPostModal;
