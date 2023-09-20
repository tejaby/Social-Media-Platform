// services
import { createPost } from "../../services/post";

// hooks
import useTokenValidation from "../user/useTokenValidation";

// react
import { useState } from "react";

function usePostActions() {
  const token = useTokenValidation();

  const [error, setError] = useState(null);

  const submitPost = async (data) => {
    if (token) {
      try {
        const response = await createPost(token, data);
        setError(null);
      } catch (e) {
        setError(e.data);
      }
    }
  };
  return { error, submitPost };
}

export default usePostActions;
