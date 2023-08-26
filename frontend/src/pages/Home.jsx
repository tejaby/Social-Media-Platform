// components
import Form from "../components/form/user/Form";

// context
import { UserContext } from "../context/User";

// react
import { useContext } from "react";

function Home() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Form />;
  }

  return <div>Home - public</div>;
}

export default Home;
