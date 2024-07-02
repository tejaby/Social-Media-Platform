// components
import Signin from "./Signin";
import Signup from "./Signup";

// context
import { InterfaceContext } from "../../../context/Interface";

// react
import { useContext } from "react";

function Form() {
  const { showLogin } = useContext(InterfaceContext);

  return showLogin ? <Signin /> : <Signup />;
}

export default Form;
