// services
// import { createPost } from "../../services/post";
import { createPostService } from "../../services/post";

// context
import { UserContext } from "../../context/User";

// hooks
// import useTokenValidation from "../user/useTokenValidation";

// react
import { useState, useContext } from "react";

function usePostActions() {
  const { token } = useContext(UserContext);

  // const token = useTokenValidation();

  const [error, setError] = useState(null);

  const submitPost = async (data) => {
    if (token) {
      try {
        const response = await createPostService(data, token.access);
        setError(null);
      } catch (e) {
        setError(e.data);
      }
    }
  };
  return { error, submitPost };
}

export default usePostActions;
