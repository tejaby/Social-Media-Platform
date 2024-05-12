// libraries
import { useNavigate } from "react-router-dom";

// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";
import { PostContext } from "../../../context/Post";

// hooks
import usePostActions from "../../../hooks/post/usePostActions";
import useToggleModalPost from "../../../hooks/interface/useToggleModalPost";

// react
import { useContext } from "react";

function ImagePreviewAndCaption({ cover, setCover }) {
  const { showModalPost, setShowModalPost, setCondition } =
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
    <div className="basis-full flex flex-col">
      <div className="flex justify-between border-b-2 border-colorHover dark:border-darkColorHover p-2">
        <button
          className="font-semibold text-black dark:text-white"
          onClick={() => {
            setCondition(false);
            reset();
          }}
        >
          Atras
        </button>
        <button
          className="font-semibold text-PrimaryColor hover:text-PrimaryColorHover"
          onClick={handleSubmit(onSubmit)}
        >
          Postear
        </button>
      </div>
      <div className="grow basis-full">
        <form
          className="w-full h-full flex flex-col xs:flex-row"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grow basis-3/5 relative">
            <img
              src={cover}
              alt=""
              className="absolute inset-0 w-full h-full object-cover xs:rounded-bl-lg"
            />
          </div>
          <div className="basis-2/5 flex flex-col gap-2">
            <p className="basis-1/5 text-base font-semibold sm:text-lg p-2 text-black dark:text-white">
              Crea una nueva publicación
            </p>
            <div className="basis-3/5 flex gap-2 p-2">
              <div className="basis-1/6 sm:basis-1/4 flex justify-center">
                <img
                  src={
                    user.profile_picture
                      ? user.profile_picture
                      : "/user-defect.png"
                  }
                  alt=""
                  className="w-9 h-9 sm:w-12 sm:h-12 object-cover rounded-full"
                />
              </div>
              <div className="basis-5/6 sm:basis-3/4 flex justify-start">
                <textarea
                  className="w-full sm:w-11/12 border rounded text-base xs:text-sm md:text-base text-center font resize-none focus:outline-none border-colorHover dark:border-darkColorHover text-black dark:text-white bg-white dark:bg-DarkColor"
                  placeholder={`¡¿Qué está pasando ${user.first_name}?!`}
                  {...register("content")}
                />
              </div>
            </div>
            <p className="text-black dark:text-white">
              {errors.content?.message}
            </p>
            <div className="basis-1/5">
              <button
                type="submit"
                className="rounded py-2 px-3 mb-2 text-white bg-PrimaryColor hover:bg-PrimaryColorHover"
              >
                Postear
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImagePreviewAndCaption;
