// libraries
import { useNavigate } from "react-router-dom";

// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";
import { PostContext } from "../../../context/Post";

// hooks
import usePostActions from "../../../hooks/post/usePostActions";
import useToggleModalPost from "../../../hooks/interface/useToggleModalPost";
import UseSvgLoader from "../../../hooks/useSvgLoader";

// react
import { useContext } from "react";

function ImagePreviewAndCaption({ cover, setCover }) {
  const { theme, showModalPost, setShowModalPost, setCondition } =
    useContext(InterfaceContext);

  const { user } = useContext(UserContext);

  const { register, errors, reset, handleSubmit } = useContext(PostContext);

  const { toggleShowModal } = useToggleModalPost(
    setShowModalPost,
    showModalPost
  );

  const { submitPost } = usePostActions();

  const navigate = useNavigate();

  const onSubmit = (v) => {
    const data = new FormData();
    data.append("content", v.content);
    data.append("image", v.image[0]);
    data.append("state", true);
    try {
      submitPost(data);
      toggleShowModal();
      setCover(null);
      setCondition(false);
      reset();
      navigate("/explore");
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <div className="basis-full flex flex-col gap-2">
      <div className="flex justify-between items-center border-b-2 p-2 border-colorHover dark:border-darkColorHover">
        <button
          onClick={() => {
            setCondition(false);
            reset();
          }}
        >
          {theme === "light" ? (
            <UseSvgLoader
              name="arrow-left"
              options={{ width: "32px", height: "32px" }}
            />
          ) : (
            <UseSvgLoader
              name="arrow-leftDark"
              options={{ width: "32px", height: "32px" }}
            />
          )}
        </button>
        <button
          className="rounded-full px-4 py-2 font-semibold text-white bg-PrimaryColor hover:bg-PrimaryColorHover"
          onClick={handleSubmit(onSubmit)}
        >
          Postear
        </button>
      </div>
      <div className="grow">
        <form
          className="w-full h-full flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="basis-3/5 relative">
            <img
              src={cover}
              alt=""
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
          <div className="basis-2/5 flex flex-col">
            <div className="basis-4/5 grow flex flex-col">
              <div className="grow flex">
                <div className="basis-1/5 p-2 flex justify-end">
                  <img
                    src={
                      user.profile_picture
                        ? user.profile_picture
                        : "/user-defect.png"
                    }
                    alt=""
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </div>
                <div className="basis-4/5">
                  <textarea
                    className="w-full h-full resize-none p-2 outline-none text-lg text-black dark:text-white bg-white dark:bg-DarkColor placeholder:text-secondaryText dark:placeholder:text-secondaryTextDark"
                    placeholder="¡¿Qué está pasando?!"
                    {...register("content")}
                    maxLength={200}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col p-2">
                <span className="font-semibold text-black dark:text-white">
                  {errors.content?.message}
                </span>
                <span className="font-semibold text-black dark:text-white">
                  {errors.image?.message}
                </span>
              </div>
            </div>
            <div className="basis-1/5 flex justify-between items-center gap-2 p-2 border-t-2 border-colorHover dark:border-darkColorHover">
              <div className="grow flex items-center">
                <span className="cursor-pointer">
                  {theme === "light" ? (
                    <UseSvgLoader
                      name="world"
                      options={{ width: "32px", height: "32px" }}
                    />
                  ) : (
                    <UseSvgLoader
                      name="worldDark"
                      options={{ width: "32px", height: "32px" }}
                    />
                  )}
                </span>
                <span className="text-sm xs:text-base text-secondaryText dark:text-secondaryTextDark">
                  Cualquier persona puede ver este post
                </span>
              </div>
              <span className="cursor-pointer">
                {theme === "light" ? (
                  <UseSvgLoader
                    name="dots-vertical"
                    options={{ width: "32px", height: "32px" }}
                  />
                ) : (
                  <UseSvgLoader
                    name="dots-verticalDark"
                    options={{ width: "32px", height: "32px" }}
                  />
                )}
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImagePreviewAndCaption;
