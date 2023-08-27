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
      <div className={`grid ${!!user ? "grid-cols-3" : "grid-cols-1"}`}>
        {!!user && (
          <div className="col-span-1">
            <Navbar />
          </div>
        )}
        <div className={`${!!user ? "col-span-2" : "col-span-1"}`}>
          <Rutas />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
