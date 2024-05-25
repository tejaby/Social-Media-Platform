// libraries
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// context
import { InterfaceContext } from "../../context/Interface";
import { PostContext } from "../../context/Post";

// hooks
import useModal from "../../hooks/interface/useModal";

// utils
import { getPostErrorMessage } from "../../utils/getErrorMessage";

// react
import { useContext } from "react";

function usePostActions() {
  const {
    showModalPost,
    setShowModalPost,
    showViewPost,
    setShowViewPost,
    setCondition,
  } = useContext(InterfaceContext);

  const { reset } = useContext(PostContext);

  const { toggleModal } = useModal();

  const navigate = useNavigate();

  const executeRequestPost = async (
    service,
    method,
    data = null,
    token = null,
    id = null
  ) => {
    try {
      if (method === "create") {
        await service(data, token);
        reset();
        setCondition(false);
        toggleModal(setShowModalPost, showModalPost);
        navigate("/explore");
      } else if (method === "delete") {
        await service(id, token);
        toast.success("El post ha sido eliminado con éxito");
        toggleModal(setShowViewPost, showViewPost);
        navigate("/explore");
      } else if (method === "deactivate") {
        await service(id, token);
        toast.success("El post ha sido archivado con éxito");
        toggleModal(setShowViewPost, showViewPost);
        navigate("/explore");
      }
    } catch (err) {
      const errorMessage = getPostErrorMessage(err, method);
      toast.error(errorMessage);
    }
  };

  return { executeRequestPost };
}

export default usePostActions;
