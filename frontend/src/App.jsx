// libraries
import { BrowserRouter } from "react-router-dom";

// pages
import Rutas from "./routers/Routes";
import Navbar from "./components/navBar/NavBar";

// context
import { UserContext } from "./context/User";

// react
import { useContext } from "react";

function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <div className="h-screen">
        {!!user && <Navbar />}
        <Rutas />
      </div>
    </BrowserRouter>
  );
}

export default App;
