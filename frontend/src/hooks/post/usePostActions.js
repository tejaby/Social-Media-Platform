// services
import { createPostService } from "../../services/post";

// context
import { UserContext } from "../../context/User";

// react
import { useState, useContext } from "react";

function usePostActions() {
  const { token } = useContext(UserContext);

  // Estado para almacenar un error en caso de que ocurra durante la creación de un post
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
