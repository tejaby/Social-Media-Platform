// libraries
import toast from "react-hot-toast";

// react
import { useState } from "react";

export const useMorePostRequest = (service) => {
  // Estado para indicar si los datos están siendo cargados
  const [loading, setLoading] = useState(false);

  const executeRequest = async (
    context,
    contextSetter,
    contextSetterPage,
    nextPageUrl,
    token = null
  ) => {
    try {
      setLoading(true);
      const response = await service(nextPageUrl, token);
      contextSetter([...context, ...response.results]);
      contextSetterPage(response.next);
    } catch (err) {
      console.log(err);
      toast.error(err.data.messages[0].message);
    } finally {
      setLoading(false);
    }
  };
  return { executeRequest, loading };
};
