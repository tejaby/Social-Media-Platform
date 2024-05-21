// libraries
import toast from "react-hot-toast";

export const usePostRequest = (service) => {
  const executeRequest = async (
    contextSetter,
    contextSetterPage,
    token = null
  ) => {
    try {
      const response = await service(token);
      contextSetter(response.results);
      contextSetterPage(response.next);
    } catch (err) {
      toast.error(err.data.detail);
    }
  };

  return { executeRequest };
};
