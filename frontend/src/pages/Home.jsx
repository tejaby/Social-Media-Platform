import { useContext, useState } from "react";

import { UserContext } from "../context/User";
import { InterfaceContext } from "../context/Interface";

import Signin from "../components/form/user/Signin";
import Signup from "../components/form/user/Signup";

function Home() {
  const { data, logout } = useContext(UserContext);

  const { showLogin } = useContext(InterfaceContext);

  if (!data) {
    return <>{showLogin ? <Signin /> : <Signup />}</>;
  }

  const handleLogout = () => {
    logout("");
  };

  return (
    <div>
      Home - public
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Home;
