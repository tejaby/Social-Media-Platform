// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";
import { PostContext } from "../../../context/Post";

// hooks
import usePostActions from "../../../hooks/post/usePostActions";

// react
import { useContext } from "react";

function ImagePreviewAndCaption() {
  const { toggleShowModal } = useContext(InterfaceContext);
  const { user } = useContext(UserContext);
  const { cover, register, errors, handleSubmit } = useContext(PostContext);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="basis-full flex flex-col">
      <div className="flex justify-between p-1">
        <button className="rounded-lg font-semibold hover:text-primary">
          atras
        </button>
        <button className="rounded-lg font-semibold hover:text-primary">
          Postear
        </button>
      </div>
      <div className="grow basis-full">
        <form className="w-full h-full flex" onSubmit={handleSubmit(onSubmit)}>
          <div className="grow basis-3/5 relative">
            <img
              src={cover}
              alt=""
              className="absolute inset-0 w-full h-full object-cover rounded-bl-lg"
            />
          </div>
          <div className="basis-2/5 flex flex-col">
            <div className="basis-3/4 flex flex-col">
              <p className="text-base sm:text-lg pb-2">
                Crea una nueva publicación
              </p>
              <p className="text-sm font-semibold text-center pb-2">
                @{user.user.username}
              </p>
              <textarea
                className="grow w-full text-center resize-none focus:outline-none"
                placeholder={`¡¿Qué está pasando ${user.user.first_name}?!`}
                {...register("content")}
              />
              <p>{errors.content?.message}</p>
              <p>{errors.content?.message}</p>
            </div>
            <div className="basis-1/4">
              <button
                type="submit"
                className="rounded py-2 px-3 hover:border-transparent hover:text-white hover:bg-primary"
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
