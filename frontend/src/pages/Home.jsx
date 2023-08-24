// components
import Signin from "../components/form/user/Signin";
import Signup from "../components/form/user/Signup";

// context
import { UserContext } from "../context/User";
import { InterfaceContext } from "../context/Interface";

// react
import { useContext } from "react";

function Home() {
  const { user } = useContext(UserContext);

  const { showLogin } = useContext(InterfaceContext);

  if (!user) {
    return <>{showLogin ? <Signin /> : <Signup />}</>;
  }

  return <div>Home - public</div>;
}

export default Home;
