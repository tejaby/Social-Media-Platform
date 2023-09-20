// services
import { user_posts } from "../services/post";

// components
import Form from "../components/form/user/Form";

// context
import { UserContext } from "../context/User";

// hooks
import useTokenValidation from "../hooks/user/useTokenValidation";

// react
import { useContext, useEffect, useState } from "react";

function Home() {
  const { user } = useContext(UserContext);

  const token = useTokenValidation();

  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);

  const fetchDataFromApi = async () => {
    if (token) {
      try {
        const response = await user_posts(token);
        setPost(response);
      } catch (e) {
        setError(e.data);
      }
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  if (!user) {
    return <Form />;
  }

  return <div className="">Home - public</div>;
}

export default Home;
