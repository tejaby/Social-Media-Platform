// libraries
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

  const handlePostSuccess = (
    message,
    showModalContent,
    setShowModalContent,
    updateGlobalModal = true
  ) => {
    toast.success(message);
    if (updateGlobalModal) {
      toggleModal(setShowModalContent, showModalContent);
    }
  };

  const executeRequestPost = async (
    service,
    method,
    data = null,
    token = null,
    id = null,
    updateGlobalModal = true
  ) => {
    try {
      if (method === "create") {
        const response = await service(data, token);
        reset();
        setCondition(false);
        handlePostSuccess(
          "El post ha sido creado con éxito",
          showModalPost,
          setShowModalPost,
          updateGlobalModal
        );
        return response;
      } else if (method === "delete") {
        await service(id, token);
        handlePostSuccess(
          "El post ha sido eliminado con éxito",
          showViewPost,
          setShowViewPost,
          updateGlobalModal
        );
        return true;
      } else if (method === "deactivate") {
        await service(id, token);
        handlePostSuccess(
          "El post ha sido archivado con éxito",
          showViewPost,
          setShowViewPost,
          updateGlobalModal
        );
        return true;
      } else if (method === "activate") {
        await service(id, token);
        handlePostSuccess(
          "El post ahora es visible para todos",
          showViewPost,
          setShowViewPost,
          updateGlobalModal
        );
        return true;
      }
    } catch (err) {
      const errorMessage = getPostErrorMessage(err, method);
      toast.error(errorMessage);
      return false;
    }
  };

  return { executeRequestPost };
}

export default usePostActions;
