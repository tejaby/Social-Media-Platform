// react
import { useState } from "react";

// Libraries
import { BrowserRouter } from "react-router-dom";

// local
import Rutas from "./routers/Routes";
import Navbar from "./components/NavBar";

function App() {
  const [user, setUser] = useState("");

  const login = () => {
    setUser({
      user: "teja",
      password: "1234",
      permissions: ["admin"],
    });
  };

  const logout = () => setUser();

  return (
    <BrowserRouter>
      <Navbar />
      {user ? (
        <button onClick={logout}>logout</button>
      ) : (
        <button onClick={login}>login</button>
      )}
      <Rutas user={user} />
    </BrowserRouter>
  );
}

export default App;
