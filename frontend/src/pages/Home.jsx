import { useContext } from "react";

import { UserContext } from "../context/User";

function Home() {
  const { data } = useContext(UserContext);
  console.log(data);
  return <div>Home - public</div>;
}

export default Home;
