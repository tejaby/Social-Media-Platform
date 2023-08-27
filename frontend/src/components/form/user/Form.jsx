// components
import Signin from "./Signin";
import Signup from "./Signup";

// context
import { InterfaceContext } from "../../../context/Interface";

// react
import { useContext } from "react";

function Form() {
  const { showLogin } = useContext(InterfaceContext);

  return (
    <div className="flex justify-center items-center h-screen">
      {showLogin ? <Signin /> : <Signup />}
    </div>
  );
}

export default Form;
