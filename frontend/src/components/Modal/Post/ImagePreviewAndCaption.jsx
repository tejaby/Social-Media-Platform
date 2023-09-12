// context
import { InterfaceContext } from "../../../context/Interface";
import { UserContext } from "../../../context/User";
import { PostContext } from "../../../context/Post";

// hooks
import usePostActions from "../../../hooks/post/usePostActions";

// react
import { useContext, useState } from "react";

function ImagePreviewAndCaption() {
  const { toggleShowModal } = useContext(InterfaceContext);
  const { user } = useContext(UserContext);
  const { cover, image } = useContext(PostContext);

  const [content, setContent] = useState("");

  const { submitPost } = usePostActions();

  const hadleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("content", content);
    data.append("image", image);
    submitPost(data);
    toggleShowModal();
  };

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
        <form className="w-full h-full flex" onSubmit={handleSubmit}>
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
                onChange={hadleChange}
              />
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
