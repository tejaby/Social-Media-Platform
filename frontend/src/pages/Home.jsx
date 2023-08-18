import { useContext } from "react";

import { UserContext } from "../context/User";

import Signin from "../components/form/user/Signin";
import Signup from "../components/form/user/Signup";

function Home() {
  const { data } = useContext(UserContext);

  if (!data) {
    return (
      <>
        <Signin />
        <Signup />
      </>
    );
  }

  return <div>Home - public</div>;
}

export default Home;
